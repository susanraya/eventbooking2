package app.auth;

import app.model.AuditLog;
import app.model.AuditLogRepository;
import app.model.ConsentRecord;
import app.model.ConsentRecordRepository;
import app.model.OrganizerProfile;
import app.model.OrganizerProfileRepository;
import app.model.User;
import app.model.UserRepository;
import app.security.JwtService;
import app.security.TokenRevocationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 * Attendee and organizer self-registration, and DPDP consent capture and withdrawal (US-001).
 *
 * <p>All personal data this writes -- users, organizer_profiles, consent_records -- lives in the
 * project's PostgreSQL database, which per NFR-005 is provisioned in AWS Mumbai (ap-south-1) via
 * {@code AWS_REGION}; this module stores nothing outside that region and logs no password or raw
 * personal data (NFR-006), only actor/action/entity audit rows.
 */
@Service
public class AuthService {

  private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");

  private final UserRepository userRepository;
  private final OrganizerProfileRepository organizerProfileRepository;
  private final ConsentRecordRepository consentRecordRepository;
  private final AuditLogRepository auditLogRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final TokenRevocationService tokenRevocationService;

  public AuthService(
      UserRepository userRepository,
      OrganizerProfileRepository organizerProfileRepository,
      ConsentRecordRepository consentRecordRepository,
      AuditLogRepository auditLogRepository,
      PasswordEncoder passwordEncoder,
      JwtService jwtService,
      TokenRevocationService tokenRevocationService) {
    this.userRepository = userRepository;
    this.organizerProfileRepository = organizerProfileRepository;
    this.consentRecordRepository = consentRecordRepository;
    this.auditLogRepository = auditLogRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
    this.tokenRevocationService = tokenRevocationService;
  }

  /** The outcome of a successful registration: the new, signed-in user and their session token. */
  public record RegisterResult(User user, String token) {}

  /**
   * Validates, then creates the account (and organizer profile, if any) and its consent record, all
   * as one write; no user row is created when validation fails or consent is missing.
   */
  public RegisterResult register(RegisterRequest request, String ipAddress) {
    Map<String, String> errors = validate(request);
    if (!errors.isEmpty()) {
      throw new ValidationErrorException(errors);
    }
    String email = request.email().strip().toLowerCase(java.util.Locale.ROOT);
    if (userRepository.findByEmail(email).isPresent()) {
      throw new EmailInUseException(email);
    }

    User user = new User();
    user.setId(UUID.randomUUID().toString());
    user.setEmail(email);
    user.setPasswordHash(passwordEncoder.encode(request.password()));
    user.setRole(request.role());
    user.setFullName(request.fullName());
    user.setPhone(request.phone());
    user.setCreatedAt(LocalDateTime.now());
    userRepository.save(user);

    if ("organizer".equals(request.role())) {
      OrganizerProfile profile = new OrganizerProfile();
      profile.setId(UUID.randomUUID().toString());
      profile.setUser(user);
      profile.setOrganizationName(request.organizationName());
      profile.setContactDetails(request.contactDetails());
      organizerProfileRepository.save(profile);
    }

    ConsentRecord consent = new ConsentRecord();
    consent.setId(UUID.randomUUID().toString());
    consent.setUser(user);
    consent.setPurposes(String.join(",", ConsentNotice.PURPOSES));
    consent.setNoticeVersion(request.noticeVersion());
    consent.setConsentGiven(true);
    consent.setGrantedAt(LocalDateTime.now());
    consentRecordRepository.save(consent);

    audit(user, "user.register", "users", user.getId(), ipAddress);

    String token = jwtService.issue(user.getId(), user.getEmail(), user.getRole());
    return new RegisterResult(user, token);
  }

  /** The outcome of a successful sign-in: the user, their session token, and a routing hint. */
  public record LoginResult(User user, String token, String home) {}

  /**
   * Authenticates email/password; an unknown email and a wrong password both throw the same {@link
   * InvalidCredentialsException} (AC-007, NFR-002). Writes one audit_logs row either way, recording
   * only the outcome -- never the submitted password.
   */
  public LoginResult login(String rawEmail, String rawPassword, String ipAddress) {
    String email = rawEmail == null ? "" : rawEmail.strip().toLowerCase(Locale.ROOT);
    String password = rawPassword == null ? "" : rawPassword;
    User user = userRepository.findByEmail(email).orElse(null);
    if (user == null || !passwordEncoder.matches(password, user.getPasswordHash())) {
      audit(user, "user.login", "users", user == null ? null : user.getId(), ipAddress, "failure");
      throw new InvalidCredentialsException();
    }
    audit(user, "user.login", "users", user.getId(), ipAddress, "success");
    String token = jwtService.issue(user.getId(), user.getEmail(), user.getRole());
    String home = "organizer".equals(user.getRole()) ? "organizer-dashboard" : "events";
    return new LoginResult(user, token, home);
  }

  /**
   * Ends the session the presented bearer token carries (NFR-003): revokes its jti in Redis for
   * exactly the token's remaining lifetime, so a later call with the same token is rejected.
   */
  public void logout(String authorizationHeader, String ipAddress) {
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "missing bearer token");
    }
    String token = authorizationHeader.substring("Bearer ".length()).strip();
    Jws<Claims> parsed;
    try {
      parsed = jwtService.parse(token);
    } catch (RuntimeException e) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid or expired token");
    }
    Claims claims = parsed.getPayload();
    User user =
        userRepository
            .findById(claims.getSubject())
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unknown user"));
    tokenRevocationService.revoke(claims.getId(), jwtService.remainingValidity(claims));
    audit(user, "user.logout", "users", user.getId(), ipAddress, "success");
  }

  /** The caller identified by a verified {@code Authorization: Bearer} token; fails closed. */
  public User requireUser(String authorizationHeader) {
    if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "missing bearer token");
    }
    String token = authorizationHeader.substring("Bearer ".length()).strip();
    String userId;
    try {
      userId = jwtService.parse(token).getPayload().getSubject();
    } catch (RuntimeException e) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid or expired token");
    }
    return userRepository
        .findById(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "unknown user"));
  }

  /** Withdraws the caller's active consent; no steps beyond those granting it required. */
  public LocalDateTime withdrawConsent(User user, String ipAddress) {
    ConsentRecord consent =
        consentRecordRepository
            .findFirstByUserAndWithdrawnAtIsNullOrderByGrantedAtDesc(user)
            .orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "no active consent to withdraw"));
    LocalDateTime withdrawnAt = LocalDateTime.now();
    consent.setWithdrawnAt(withdrawnAt);
    consentRecordRepository.save(consent);
    audit(user, "consent.withdraw", "consent_records", consent.getId(), ipAddress);
    return withdrawnAt;
  }

  private void audit(User actor, String action, String entity, String entityId, String ipAddress) {
    audit(actor, action, entity, entityId, ipAddress, "success");
  }

  private void audit(
      User actor, String action, String entity, String entityId, String ipAddress, String outcome) {
    AuditLog log = new AuditLog();
    log.setId(UUID.randomUUID().toString());
    log.setActorUser(actor);
    log.setAction(action);
    log.setEntity(entity);
    log.setEntityId(entityId);
    log.setIpAddress(ipAddress);
    log.setOutcome(outcome);
    log.setCreatedAt(LocalDateTime.now());
    auditLogRepository.save(log);
  }

  private Map<String, String> validate(RegisterRequest request) {
    Map<String, String> errors = new LinkedHashMap<>();
    String email = request.email() == null ? "" : request.email().strip();
    if (email.isBlank() || !EMAIL_PATTERN.matcher(email).matches()) {
      errors.put("email", "must be a valid email address");
    }

    String password = request.password() == null ? "" : request.password();
    StringBuilder passwordProblem = new StringBuilder();
    if (password.length() < 8) {
      passwordProblem.append("must be at least 8 characters");
    }
    if (password.chars().noneMatch(Character::isDigit)) {
      if (passwordProblem.length() > 0) {
        passwordProblem.append(" and ");
      }
      passwordProblem.append("must include at least 1 number");
    }
    if (passwordProblem.length() > 0) {
      errors.put("password", passwordProblem.toString());
    }

    if (request.fullName() == null || request.fullName().isBlank()) {
      errors.put("fullName", "is required");
    }
    if (request.phone() == null || request.phone().isBlank()) {
      errors.put("phone", "is required");
    }

    String role = request.role();
    if (role == null || !(role.equals("attendee") || role.equals("organizer"))) {
      errors.put("role", "must be 'attendee' or 'organizer'");
    } else if (role.equals("organizer")) {
      if (request.organizationName() == null || request.organizationName().isBlank()) {
        errors.put("organizationName", "is required for organizer accounts");
      }
      if (request.contactDetails() == null || request.contactDetails().isBlank()) {
        errors.put("contactDetails", "is required for organizer accounts");
      }
    }

    if (!request.consentGiven()) {
      errors.put("consentGiven", "consent is required to register");
    }
    if (request.noticeVersion() == null || request.noticeVersion().isBlank()) {
      errors.put("noticeVersion", "is required");
    }
    return errors;
  }
}
