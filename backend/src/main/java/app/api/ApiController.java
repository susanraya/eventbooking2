package app.api;

import app.Stubs;
import app.auth.AuthService;
import app.auth.ConsentNotice;
import app.auth.EmailInUseException;
import app.auth.InvalidCredentialsException;
import app.auth.LoginRequest;
import app.auth.RegisterRequest;
import app.auth.ValidationErrorException;
import app.model.User;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * Handlers for API.
 *
 * <p>Endpoints the approved API spec declares without naming a component that owns them.
 *
 * <p>Every handler is a stub returning a placeholder, except {@code /auth/register} and {@code
 * /consent/withdraw} (US-001), which {@link AuthService} implements.
 */
@RestController
public class ApiController {

  private final AuthService authService;

  public ApiController(AuthService authService) {
    this.authService = authService;
  }

  /**
   * Register an attendee or organizer with validated email/password, required details and active
   * DPDP consent; stores a consent record and signs the user in
   */
  @PostMapping("/auth/register")
  public ResponseEntity<Map<String, Object>> postAuthRegister(
      @RequestBody RegisterRequest request, HttpServletRequest httpRequest) {
    AuthService.RegisterResult result = authService.register(request, httpRequest.getRemoteAddr());
    User user = result.user();
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(
            Map.of(
                "token",
                result.token(),
                "user",
                Map.of(
                    "id", user.getId(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "fullName", user.getFullName())));
  }

  /** Field-level messages naming the requirement each invalid field failed (AC-003, NFR-012). */
  @ExceptionHandler(ValidationErrorException.class)
  public ResponseEntity<Map<String, Object>> handleValidationError(ValidationErrorException e) {
    return ResponseEntity.badRequest().body(Map.of("errors", e.getErrors()));
  }

  /** AC-002: a clear, specific conflict, and no second account. */
  @ExceptionHandler(EmailInUseException.class)
  public ResponseEntity<Map<String, Object>> handleEmailInUse(EmailInUseException e) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(Map.of("error", "email_in_use", "message", "email already in use"));
  }

  /** AC-009: the purposes and notice version the registration form must render. */
  @GetMapping("/consent/notice")
  public Map<String, Object> getConsentNotice() {
    return Map.of(
        "purposes", ConsentNotice.PURPOSES, "noticeVersion", ConsentNotice.CURRENT_VERSION);
  }

  /** Authenticate credentials and return a JWT; failures give a generic error */
  @PostMapping("/auth/login")
  public Map<String, Object> postAuthLogin(
      @RequestBody LoginRequest request, HttpServletRequest httpRequest) {
    AuthService.LoginResult result =
        authService.login(request.email(), request.password(), httpRequest.getRemoteAddr());
    User user = result.user();
    return Map.of(
        "token",
        result.token(),
        "user",
        Map.of(
            "id", user.getId(),
            "email", user.getEmail(),
            "role", user.getRole(),
            "fullName", user.getFullName()),
        "home",
        result.home());
  }

  /** AC-007, NFR-002: the same generic failure for an unknown email or a wrong password. */
  @ExceptionHandler(InvalidCredentialsException.class)
  public ResponseEntity<Map<String, Object>> handleInvalidCredentials(
      InvalidCredentialsException e) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(Map.of("error", "invalid_credentials", "message", "Email or password is incorrect."));
  }

  /** End the current session so protected pages require re-auth */
  @PostMapping("/auth/logout")
  public ResponseEntity<Void> postAuthLogout(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
      HttpServletRequest httpRequest) {
    authService.logout(authorizationHeader, httpRequest.getRemoteAddr());
    return ResponseEntity.noContent().build();
  }

  /** Record a consent withdrawal with timestamp through a flow no harder than granting */
  @PostMapping("/consent/withdraw")
  public Map<String, Object> postConsentWithdraw(
      @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
      HttpServletRequest httpRequest) {
    User user = authService.requireUser(authorizationHeader);
    var withdrawnAt = authService.withdrawConsent(user, httpRequest.getRemoteAddr());
    return Map.of("withdrawnAt", withdrawnAt.toString());
  }

  /** Organizer creates an event with validated required fields */
  @PostMapping("/events")
  public Map<String, String> postEvents() {
    return Stubs.notImplemented("POST /events");
  }

  /** Organizer updates their own event; changes reflect on the public listing */
  @PutMapping("/events/{id}")
  public Map<String, String> putEventsById() {
    return Stubs.notImplemented("PUT /events/{id}");
  }

  /** Organizer defines a general-admission ticket type with name, INR price and quantity */
  @PostMapping("/events/{id}/ticket-types")
  public Map<String, String> postEventsByIdTicketTypes() {
    return Stubs.notImplemented("POST /events/{id}/ticket-types");
  }

  /** Organizer dashboard list of own events with status and tickets sold vs available */
  @GetMapping("/organizer/events")
  public Map<String, String> getOrganizerEvents() {
    return Stubs.notImplemented("GET /organizer/events");
  }

  /**
   * Public event detail with venue, date/time, description and ticket types marked sold-out where
   * exhausted
   */
  @GetMapping("/events/{id}")
  public Map<String, String> getEventsById() {
    return Stubs.notImplemented("GET /events/{id}");
  }

  /**
   * Create an order for selected ticket types/quantities within stock, reserve stock and create a
   * Razorpay order
   */
  @PostMapping("/orders")
  public Map<String, String> postOrders() {
    return Stubs.notImplemented("POST /orders");
  }

  /** Attendee's own tickets with event info, upcoming vs past, each with its QR image */
  @GetMapping("/me/tickets")
  public Map<String, String> getMeTickets() {
    return Stubs.notImplemented("GET /me/tickets");
  }

  /** View a single owned ticket with its unique QR code and event details */
  @GetMapping("/me/tickets/{id}")
  public Map<String, String> getMeTicketsById() {
    return Stubs.notImplemented("GET /me/tickets/{id}");
  }
}
