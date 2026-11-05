package app.api;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import app.model.TicketType;
import app.model.TicketTypeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

/**
 * Integration tests for POST /events/{id}/ticket-types and GET /events/{id} (US-007).
 *
 * <p>NFR-005 (data stored in India / AWS Mumbai region) is infrastructure/ops configuration, not
 * observable through the API in this sandbox; not asserted here. NFR-006's 180-day retention
 * target is likewise an ops setting outside API scope; the audit-row-with-timestamp part is
 * already covered by {@code EventApiIT#testEventMutationWritesAuditLogRowWithTimestamp}.
 */
@SpringBootTest
@AutoConfigureMockMvc
class TicketTypeApiIT {

  @Autowired private MockMvc mockMvc;
  private final ObjectMapper objectMapper = new ObjectMapper();
  @Autowired private TicketTypeRepository ticketTypeRepository;

  private Map<String, Object> ticketTypeBody(String name, String price, int quantity) {
    Map<String, Object> body = new HashMap<>();
    body.put("name", name);
    body.put("priceInr", price);
    body.put("quantityTotal", quantity);
    return body;
  }

  @Test
  void testAc016OwnerAddsTicketTypeAndItAppearsForSaleOnTheEvent() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "owner016@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("General", "499.00", 100))))
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.ticketTypeId").isNotEmpty());

    mockMvc
        .perform(get("/events/" + eventId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.ticketTypes.length()").value(1))
        .andExpect(jsonPath("$.ticketTypes[0].name").value("General"))
        .andExpect(jsonPath("$.ticketTypes[0].priceInr").value(499.00))
        .andExpect(jsonPath("$.ticketTypes[0].quantityTotal").value(100))
        .andExpect(jsonPath("$.ticketTypes[0].soldOut").value(false));
  }

  @Test
  void testAc017TwoTicketTypesHoldIndependentQuantities() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "owner017@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());

    MvcResult regularResult =
        mockMvc
            .perform(
                post("/events/" + eventId + "/ticket-types")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(ticketTypeBody("Regular", "300.00", 10))))
            .andExpect(status().isCreated())
            .andReturn();
    String regularId =
        objectMapper
            .readTree(regularResult.getResponse().getContentAsString())
            .get("ticketTypeId")
            .asText();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("VIP", "1500.00", 5))))
        .andExpect(status().isCreated());

    // Simulate stock consumption of Regular only (ordering itself is not in scope of US-007).
    TicketType regular = ticketTypeRepository.findById(regularId).orElseThrow();
    regular.setQuantitySold(10);
    ticketTypeRepository.save(regular);

    MvcResult detail =
        mockMvc
            .perform(get("/events/" + eventId))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.ticketTypes.length()").value(2))
            .andReturn();
    var ticketTypes = objectMapper.readTree(detail.getResponse().getContentAsString()).get("ticketTypes");
    boolean foundRegular = false;
    boolean foundVip = false;
    for (var tt : ticketTypes) {
      if ("Regular".equals(tt.get("name").asText())) {
        foundRegular = true;
        Assertions.assertTrue(tt.get("soldOut").asBoolean());
        Assertions.assertEquals(10, tt.get("quantitySold").asInt());
      }
      if ("VIP".equals(tt.get("name").asText())) {
        foundVip = true;
        Assertions.assertFalse(tt.get("soldOut").asBoolean());
        Assertions.assertEquals(0, tt.get("quantitySold").asInt());
        Assertions.assertEquals(5, tt.get("quantityTotal").asInt());
      }
    }
    Assertions.assertTrue(foundRegular);
    Assertions.assertTrue(foundVip);
  }

  @Test
  void testAc018RequestAndResponseHaveNoSeatFields() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "owner018@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());

    MvcResult createResult =
        mockMvc
            .perform(
                post("/events/" + eventId + "/ticket-types")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(ticketTypeBody("GA", "250.00", 20))))
            .andExpect(status().isCreated())
            .andReturn();
    String createBody = createResult.getResponse().getContentAsString();
    Assertions.assertFalse(createBody.toLowerCase().contains("seat"));

    MvcResult detail =
        mockMvc.perform(get("/events/" + eventId)).andExpect(status().isOk()).andReturn();
    String detailBody = detail.getResponse().getContentAsString();
    Assertions.assertFalse(detailBody.toLowerCase().contains("seat"));
  }

  @Test
  void testGetEventByIdReturnsVenueCityDateDescriptionAndSoldOutFlags() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "owner-detail@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());

    MvcResult createResult =
        mockMvc
            .perform(
                post("/events/" + eventId + "/ticket-types")
                    .header("Authorization", "Bearer " + token)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(ticketTypeBody("SoldOut", "100.00", 1))))
            .andExpect(status().isCreated())
            .andReturn();
    String ticketTypeId =
        objectMapper
            .readTree(createResult.getResponse().getContentAsString())
            .get("ticketTypeId")
            .asText();
    TicketType ticketType = ticketTypeRepository.findById(ticketTypeId).orElseThrow();
    ticketType.setQuantitySold(1);
    ticketTypeRepository.save(ticketType);

    mockMvc
        .perform(get("/events/" + eventId))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.event.venue").value("Open Grounds"))
        .andExpect(jsonPath("$.event.city").value("Mumbai"))
        .andExpect(jsonPath("$.event.startsAt").isNotEmpty())
        .andExpect(jsonPath("$.event.description").value("An evening of live music."))
        .andExpect(jsonPath("$.ticketTypes[0].priceInr").value(100.00))
        .andExpect(jsonPath("$.ticketTypes[0].soldOut").value(true));
  }

  @Test
  void testBlankNameReturns400WithFieldErrorAndPersistsNothing() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "invalid-name@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("  ", "100.00", 10))))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.name").isNotEmpty());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testZeroPriceReturns400WithFieldErrorAndPersistsNothing() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "invalid-zero-price@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("GA", "0", 10))))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.priceInr").isNotEmpty());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testNegativePriceReturns400WithFieldErrorAndPersistsNothing() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "invalid-neg-price@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("GA", "-50.00", 10))))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.priceInr").isNotEmpty());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testZeroQuantityReturns400WithFieldErrorAndPersistsNothing() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "invalid-zero-qty@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("GA", "100.00", 0))))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.quantityTotal").isNotEmpty());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testNegativeQuantityReturns400WithFieldErrorAndPersistsNothing() throws Exception {
    String token =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "invalid-neg-qty@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, token, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("GA", "100.00", -5))))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.errors.quantityTotal").isNotEmpty());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testNonOwnerAddingTicketTypeReceives403AndPersistsNothing() throws Exception {
    String ownerToken =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "owner-403@example.com", "organizer");
    String otherToken =
        EventTestHelpers.registerAndGetToken(mockMvc, objectMapper, "other-403@example.com", "organizer");
    String eventId =
        EventTestHelpers.createEvent(mockMvc, objectMapper, ownerToken, EventTestHelpers.validEventBody());
    long before = ticketTypeRepository.count();

    mockMvc
        .perform(
            post("/events/" + eventId + "/ticket-types")
                .header("Authorization", "Bearer " + otherToken)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(ticketTypeBody("Sneaky", "100.00", 10))))
        .andExpect(status().isForbidden());

    Assertions.assertEquals(before, ticketTypeRepository.count());
  }

  @Test
  void testGetEventByIdForUnknownIdReturns404() throws Exception {
    mockMvc.perform(get("/events/does-not-exist")).andExpect(status().isNotFound());
  }
}
