package app.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

/**
 * Shared event/organizer setup for the US-006 and US-007 integration suites, so ticket-type tests
 * do not re-invent registration and event creation.
 */
final class EventTestHelpers {

  private EventTestHelpers() {}

  static Map<String, Object> registerBody(String email, String role) {
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

  static String registerAndGetToken(
      MockMvc mockMvc, ObjectMapper objectMapper, String email, String role) throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(registerBody(email, role))))
            .andExpect(status().isCreated())
            .andReturn();
    return objectMapper.readTree(result.getResponse().getContentAsString()).get("token").asText();
  }

  static Map<String, Object> validEventBody() {
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

  static String createEvent(
      MockMvc mockMvc, ObjectMapper objectMapper, String token, Map<String, Object> eventBody)
      throws Exception {
    MvcResult result =
        mockMvc
            .perform(
                post("/events")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(eventBody)))
            .andExpect(status().isCreated())
            .andReturn();
    return objectMapper.readTree(result.getResponse().getContentAsString()).get("eventId").asText();
  }
}
