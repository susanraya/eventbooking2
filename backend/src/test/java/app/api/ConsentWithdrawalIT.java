package app.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.model.AuditLogRepository;
import app.model.ConsentRecordRepository;
import app.model.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Integration tests for POST /consent/withdraw (US-005-2), beyond the baseline happy-path and
 * no-token cases already covered by {@code ApiControllerIT}: an invalid token, isolation between
 * users, and the audit row's actor/timestamp (NFR-006).
 *
 * <p>NFR-005 (data stored in India / AWS Mumbai region) and the 180-day log retention target of
 * NFR-006 are infrastructure/ops configuration, not observable through this API in the sandbox; not
 * asserted here.
 */
@SpringBootTest
@AutoConfigureMockMvc
class ConsentWithdrawalIT {

  @Autowired private MockMvc mockMvc;
  private final ObjectMapper objectMapper = new ObjectMapper();
  @Autowired private UserRepository userRepository;
  @Autowired private ConsentRecordRepository consentRecordRepository;
  @Autowired private AuditLogRepository auditLogRepository;

  private String registerAndGetToken(String email) throws Exception {
    return EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, email, "attendee");
  }

  @Test
  void testAc001ValidTokenWithdrawsOnlyThatUsersConsentAndReturnsWithdrawnAt() throws Exception {
    String tokenA = registerAndGetToken("withdraw-isolation-a@example.com");
    String tokenB = registerAndGetToken("withdraw-isolation-b@example.com");
    String userIdA =
        userRepository.findByEmail("withdraw-isolation-a@example.com").orElseThrow().getId();
    String userIdB =
        userRepository.findByEmail("withdraw-isolation-b@example.com").orElseThrow().getId();

    mockMvc
        .perform(post("/consent/withdraw").header("Authorization", "Bearer " + tokenA))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.withdrawnAt").isNotEmpty());

    var consentA =
        consentRecordRepository.findAll().stream()
            .filter(c -> userIdA.equals(c.getUser().getId()))
            .findFirst()
            .orElseThrow();
    var consentB =
        consentRecordRepository.findAll().stream()
            .filter(c -> userIdB.equals(c.getUser().getId()))
            .findFirst()
            .orElseThrow();

    Assertions.assertNotNull(consentA.getWithdrawnAt());
    Assertions.assertNull(consentB.getWithdrawnAt());
  }

  @Test
  void testAc002InvalidTokenReturns401AndRecordsNothing() throws Exception {
    long consentWithdrawalsBefore =
        consentRecordRepository.findAll().stream().filter(c -> c.getWithdrawnAt() != null).count();
    long auditsBefore = auditLogRepository.count();

    mockMvc
        .perform(post("/consent/withdraw").header("Authorization", "Bearer not-a-real-token"))
        .andExpect(status().isUnauthorized());

    long consentWithdrawalsAfter =
        consentRecordRepository.findAll().stream().filter(c -> c.getWithdrawnAt() != null).count();
    Assertions.assertEquals(consentWithdrawalsBefore, consentWithdrawalsAfter);
    Assertions.assertEquals(auditsBefore, auditLogRepository.count());
  }

  @Test
  void testAc002NoTokenReturns401AndRecordsNothing() throws Exception {
    long auditsBefore = auditLogRepository.count();

    mockMvc.perform(post("/consent/withdraw")).andExpect(status().isUnauthorized());

    Assertions.assertEquals(auditsBefore, auditLogRepository.count());
  }

  @Test
  void testAc003WithdrawalWritesAuditLogRowWithActorAndTimestampNfr006() throws Exception {
    String email = "withdraw-audit@example.com";
    String token = registerAndGetToken(email);
    String userId = userRepository.findByEmail(email).orElseThrow().getId();
    long auditsBeforeWithdraw = auditLogRepository.count();

    mockMvc
        .perform(post("/consent/withdraw").header("Authorization", "Bearer " + token))
        .andExpect(status().isOk());

    Assertions.assertTrue(auditLogRepository.count() > auditsBeforeWithdraw);
    var withdrawLog =
        auditLogRepository.findAll().stream()
            .filter(a -> "consent.withdraw".equals(a.getAction()))
            .filter(a -> a.getActorUser() != null && userId.equals(a.getActorUser().getId()))
            .findFirst()
            .orElseThrow();
    Assertions.assertNotNull(withdrawLog.getActorUser());
    Assertions.assertEquals(userId, withdrawLog.getActorUser().getId());
    Assertions.assertNotNull(withdrawLog.getCreatedAt());
  }
}
