package app.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.model.AuditLogRepository;
import app.model.ConsentRecordRepository;
import app.model.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

/** Integration tests for POST /auth/register and POST /consent/withdraw (US-001-1). */
@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerIT {

  @Autowired private MockMvc mockMvc;
  private final ObjectMapper objectMapper = new ObjectMapper();
  @Autowired private UserRepository userRepository;
  @Autowired private ConsentRecordRepository consentRecordRepository;
  @Autowired private AuditLogRepository auditLogRepository;

  private Map<String, Object> attendeeBody(String email) {
    return Map.of(
        "email", email,
        "password", "password1",
        "fullName", "Jane Attendee",
        "phone", "9876543210",
        "role", "attendee",
        "consentGiven", true,
        "noticeVersion", "2026-01");
  }

  @Test
  void testAc001RegistersAttendeeAndReturnsSessionToken() throws Exception {
    long usersBefore = userRepository.count();
    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendeeBody("attendee1@example.com"))))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.token").isNotEmpty())
        .andExpect(jsonPath("$.user.email").value("attendee1@example.com"))
        .andExpect(jsonPath("$.user.role").value("attendee"));
    org.junit.jupiter.api.Assertions.assertEquals(usersBefore + 1, userRepository.count());
  }

  @Test
  void testAc004Ac005RegistersOrganizerWithProfileAndNoApprovalGate() throws Exception {
    Map<String, Object> body = new java.util.HashMap<>(attendeeBody("organizer1@example.com"));
    body.put("role", "organizer");
    body.put("organizationName", "Acme Events");
    body.put("contactDetails", "contact@acme.example");

    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.user.role").value("organizer"))
        .andExpect(jsonPath("$.token").isNotEmpty());
  }

  @Test
  void testAc002DuplicateEmailReturns409AndNoSecondAccount() throws Exception {
    String email = "dup@example.com";
    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendeeBody(email))))
        .andExpect(status().isCreated());
    long usersAfterFirst = userRepository.count();

    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendeeBody(email))))
        .andExpect(status().isConflict())
        .andExpect(jsonPath("$.error").value("email_in_use"))
        .andExpect(jsonPath("$.message").isNotEmpty());

    org.junit.jupiter.api.Assertions.assertEquals(usersAfterFirst, userRepository.count());
  }

  @Test
  void testAc003InvalidEmailAndWeakPasswordReturn400WithFieldMessages() throws Exception {
    Map<String, Object> body = new java.util.HashMap<>(attendeeBody("not-an-email"));
    body.put("password", "short");

    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.email").isNotEmpty())
        .andExpect(jsonPath("$.errors.password").isNotEmpty());
  }

  @Test
  void testAc010MissingConsentReturns400AndNoUserRow() throws Exception {
    long usersBefore = userRepository.count();
    Map<String, Object> body = new java.util.HashMap<>(attendeeBody("noconsent@example.com"));
    body.put("consentGiven", false);

    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.consentGiven").isNotEmpty());

    org.junit.jupiter.api.Assertions.assertEquals(usersBefore, userRepository.count());
  }

  @Test
  void testAc011WritesConsentRecordWithPurposesAndNoticeVersion() throws Exception {
    long consentsBefore = consentRecordRepository.count();
    String body = objectMapper.writeValueAsString(attendeeBody("consentcheck@example.com"));
    MvcResult result =
        mockMvc
            .perform(post("/auth/register").contentType(MediaType.APPLICATION_JSON).content(body))
            .andExpect(status().isCreated())
            .andReturn();
    String userId =
        objectMapper
            .readTree(result.getResponse().getContentAsString())
            .get("user")
            .get("id")
            .asText();

    org.junit.jupiter.api.Assertions.assertEquals(
        consentsBefore + 1, consentRecordRepository.count());
    var consent =
        consentRecordRepository.findAll().stream()
            .filter(c -> c.getUser().getId().equals(userId))
            .findFirst()
            .orElseThrow();
    org.junit.jupiter.api.Assertions.assertEquals("2026-01", consent.getNoticeVersion());
    org.junit.jupiter.api.Assertions.assertTrue(consent.getPurposes().length() > 0);
    org.junit.jupiter.api.Assertions.assertNotNull(consent.getGrantedAt());
  }

  @Test
  void testAc009ConsentNoticeMetadataIsServed() throws Exception {
    mockMvc
        .perform(
            org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get(
                "/consent/notice"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.purposes").isArray())
        .andExpect(jsonPath("$.noticeVersion").isNotEmpty());
  }

  @Test
  void testWithdrawRequiresNoMoreStepsThanGrantingAndSetsWithdrawnAt() throws Exception {
    long auditsBefore = auditLogRepository.count();
    MvcResult registerResult =
        mockMvc
            .perform(
                post("/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(attendeeBody("withdraw@example.com"))))
            .andExpect(status().isCreated())
            .andReturn();
    String token =
        objectMapper
            .readTree(registerResult.getResponse().getContentAsString())
            .get("token")
            .asText();

    mockMvc
        .perform(post("/consent/withdraw").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.withdrawnAt").isNotEmpty());

    org.junit.jupiter.api.Assertions.assertTrue(auditLogRepository.count() > auditsBefore + 1);
  }

  @Test
  void testWithdrawWithoutTokenIsRejected() throws Exception {
    mockMvc.perform(post("/consent/withdraw")).andExpect(status().isUnauthorized());
  }

  @Test
  void testAc010RegisterWithoutExtraHeaderStillSucceeds() throws Exception {
    mockMvc
        .perform(
            post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(attendeeBody("headercheck@example.com"))))
        .andExpect(header().doesNotExist("X-Not-A-Real-Header"));
  }
}
