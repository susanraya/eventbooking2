package app.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.model.AuditLogRepository;
import app.model.EventRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

/**
 * Integration tests for POST /events, PUT /events/{id} and GET /organizer/events (US-006).
 *
 * <p>NFR-005 (data stored in India / AWS Mumbai region) and the 180-day log retention part of
 * NFR-006 are infrastructure/ops configuration, not observable through the API in this sandbox;
 * they are not asserted here. The audit-row-with-timestamp part of NFR-006 is asserted directly.
 */
@SpringBootTest
@AutoConfigureMockMvc
class EventApiIT {

  @Autowired private org.springframework.test.web.servlet.MockMvc mockMvc;
  private final ObjectMapper objectMapper = new ObjectMapper();
  @Autowired private EventRepository eventRepository;
  @Autowired private AuditLogRepository auditLogRepository;

  private Map<String, Object> registerBody(String email, String role) {
    Map<String, Object> body = new HashMap<>();
    body.put("email", email);
    body.put("password", "password1");
    body.put("fullName", "Test " + role);
    body.put("phone", "9876543210");
    body.put("role", role);
    body.put("consentGiven", true);
    body.put("noticeVersion", "2026-01");
    if ("organizer".equals(role)) {
      body.put("organizationName", "Acme Events");
      body.put("contactDetails", "contact@acme.example");
    }
    return body;
  }

  private String registerAndGetToken(String email, String role) throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(registerBody(email, role))))
            .andExpect(status().isCreated())
            .andReturn();
    return objectMapper
        .readTree(result.getResponse().getContentAsString())
        .get("token")
        .asText();
  }

  private Map<String, Object> validEventBody() {
    Map<String, Object> body = new HashMap<>();
    body.put("title", "Music Night");
    body.put("venue", "Open Grounds");
    body.put("city", "Mumbai");
    body.put("category", "music");
    body.put("description", "An evening of live music.");
    body.put("startsAt", "2026-12-01T18:00:00");
    body.put("posterUrl", null);
    body.put("status", "published");
    return body;
  }

  @Test
  void testAc014OrganizerCreatesEventVisibleToUnauthenticatedAttendee() throws Exception {
    String token = registerAndGetToken("organizer-ac014@example.com", "organizer");

    MvcResult createResult =
        mockMvc
            .perform(
                post("/events")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(validEventBody())))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.eventId").isNotEmpty())
            .andReturn();
    String eventId =
        objectMapper.readTree(createResult.getResponse().getContentAsString()).get("eventId").asText();

    mockMvc
        .perform(get("/events/" + eventId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.event.title").value("Music Night"))
        .andExpect(jsonPath("$.event.venue").value("Open Grounds"));
  }

  @Test
  void testAc015MissingTitleReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015a@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("title");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.title").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015MissingVenueReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015b@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("venue");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.venue").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015MissingCityReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015c@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("city");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.city").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015MissingStartsAtReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015d@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("startsAt");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.startsAt").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015MissingCategoryReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015e@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("category");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.category").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015MissingDescriptionReturns400WithFieldErrorAndNoRowPersisted() throws Exception {
    String token = registerAndGetToken("organizer-ac015f@example.com", "organizer");
    long before = eventRepository.count();
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.remove("description");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.description").isNotEmpty());

    Assertions.assertEquals(before, eventRepository.count());
  }

  @Test
  void testAc015InvalidStartsAtReturns400WithFieldError() throws Exception {
    String token = registerAndGetToken("organizer-ac015g@example.com", "organizer");
    Map<String, Object> body = new HashMap<>(validEventBody());
    body.put("startsAt", "not-a-date");

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(body)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.startsAt").isNotEmpty());
  }

  @Test
  void testPutByNonOwnerReturns403AndLeavesEventUnchangedThenOwnerUpdateIsVisible()
      throws Exception {
    String ownerToken = registerAndGetToken("owner-put@example.com", "organizer");
    String otherToken = registerAndGetToken("other-put@example.com", "organizer");

    MvcResult createResult =
        mockMvc
            .perform(
                post("/events")
                    .header("Authorization", "Bearer " + ownerToken)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(validEventBody())))
            .andExpect(status().isCreated())
            .andReturn();
    String eventId =
        objectMapper.readTree(createResult.getResponse().getContentAsString()).get("eventId").asText();

    Map<String, Object> maliciousUpdate = new HashMap<>(validEventBody());
    maliciousUpdate.put("title", "Hijacked Title");

    mockMvc
        .perform(
            put("/events/" + eventId)
                .header("Authorization", "Bearer " + otherToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(maliciousUpdate)))
        .andExpect(status().isForbidden());

    mockMvc
        .perform(get("/events/" + eventId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.event.title").value("Music Night"));

    Map<String, Object> ownerUpdate = new HashMap<>(validEventBody());
    ownerUpdate.put("title", "Updated By Owner");

    mockMvc
        .perform(
            put("/events/" + eventId)
                .header("Authorization", "Bearer " + ownerToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ownerUpdate)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.event.title").value("Updated By Owner"));

    mockMvc
        .perform(get("/events/" + eventId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.event.title").value("Updated By Owner"));
  }

  @Test
  void testOrganizerEventsReturnsOnlyCallersEventsAndEmptyForNewOrganizer() throws Exception {
    String tokenA = registerAndGetToken("organizer-list-a@example.com", "organizer");
    String tokenB = registerAndGetToken("organizer-list-b@example.com", "organizer");

    mockMvc
        .perform(get("/organizer/events").header("Authorization", "Bearer " + tokenB))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(0));

    mockMvc
        .perform(
            post("/events")
                .header("Authorization", "Bearer " + tokenA)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEventBody())))
        .andExpect(status().isCreated());

    mockMvc
        .perform(get("/organizer/events").header("Authorization", "Bearer " + tokenA))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].title").value("Music Night"));

    mockMvc
        .perform(get("/organizer/events").header("Authorization", "Bearer " + tokenB))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  void testUnauthenticatedPostEventsReturns401() throws Exception {
    mockMvc
        .perform(
            post("/events")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEventBody())))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void testUnauthenticatedPutEventsByIdReturns401() throws Exception {
    mockMvc
        .perform(
            put("/events/some-id")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEventBody())))
        .andExpect(status().isUnauthorized());
  }

  @Test
  void testUnauthenticatedGetOrganizerEventsReturns401() throws Exception {
    mockMvc.perform(get("/organizer/events")).andExpect(status().isUnauthorized());
  }

  @Test
  void testEventMutationWritesAuditLogRowWithTimestamp() throws Exception {
    String token = registerAndGetToken("organizer-audit@example.com", "organizer");
    long auditsBefore = auditLogRepository.count();

    MvcResult createResult =
        mockMvc
            .perform(
                post("/events")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(validEventBody())))
            .andExpect(status().isCreated())
            .andReturn();
    String eventId =
        objectMapper.readTree(createResult.getResponse().getContentAsString()).get("eventId").asText();

    Assertions.assertTrue(auditLogRepository.count() > auditsBefore);
    var createLog =
        auditLogRepository.findAll().stream()
            .filter(a -> eventId.equals(a.getEntityId()) && "event.create".equals(a.getAction()))
            .findFirst()
            .orElseThrow();
    Assertions.assertNotNull(createLog.getCreatedAt());

    long auditsAfterCreate = auditLogRepository.count();
    mockMvc
        .perform(
            put("/events/" + eventId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(validEventBody())))
        .andExpect(status().isOk());

    Assertions.assertTrue(auditLogRepository.count() > auditsAfterCreate);
    var updateLog =
        auditLogRepository.findAll().stream()
            .filter(a -> eventId.equals(a.getEntityId()) && "event.update".equals(a.getAction()))
            .findFirst()
            .orElseThrow();
    Assertions.assertNotNull(updateLog.getCreatedAt());
  }
}
