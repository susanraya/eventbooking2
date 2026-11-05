package app.events;

import java.math.BigDecimal;

/** The POST /events/{id}/ticket-types request body. */
public record TicketTypeRequest(String name, BigDecimal priceInr, Integer quantityTotal) {}
