package app.events;

import app.auth.ValidationErrorException;
import app.model.AuditLog;
import app.model.AuditLogRepository;
import app.model.Event;
import app.model.EventRepository;
import app.model.TicketType;
import app.model.TicketTypeRepository;
import app.model.User;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

/**
 * Organizer event creation, update and listing, plus the published-only public read path (US-006).
 * All event rows live in the project's PostgreSQL database only (NFR-005); every mutating call
 * writes an audit_logs row recording actor, action, entity and timestamp (NFR-006).
 */
@Service
public class EventService {

  private final EventRepository eventRepository;
  private final TicketTypeRepository ticketTypeRepository;
  private final AuditLogRepository auditLogRepository;

  public EventService(
      EventRepository eventRepository,
      TicketTypeRepository ticketTypeRepository,
      AuditLogRepository auditLogRepository) {
    this.eventRepository = eventRepository;
    this.ticketTypeRepository = ticketTypeRepository;
    this.auditLogRepository = auditLogRepository;
  }

  /** AC-014: creates a published event belonging to the caller. */
  public Event createEvent(User organizer, EventRequest request, String ipAddress) {
    Map<String, String> errors = new LinkedHashMap<>();
    LocalDateTime startsAt = validate(request, errors);
    if (!errors.isEmpty()) {
      throw new ValidationErrorException(errors);
    }

    Event event = new Event();
    event.setId(UUID.randomUUID().toString());
    event.setOrganizer(organizer);
    applyFields(event, request, startsAt);
    event.setStatus("published");
    event.setCreatedAt(LocalDateTime.now());
    eventRepository.save(event);
    audit(organizer, "event.create", event.getId(), ipAddress);
    return event;
  }

  /** NFR-007: only the owning organizer may update; a non-owner gets 403, nothing changes. */
  @Transactional
  public Event updateEvent(User user, String id, EventRequest request, String ipAddress) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "event not found"));
    if (!event.getOrganizer().getId().equals(user.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not the owner of this event");
    }

    Map<String, String> errors = new LinkedHashMap<>();
    LocalDateTime startsAt = validate(request, errors);
    if (!errors.isEmpty()) {
      throw new ValidationErrorException(errors);
    }

    applyFields(event, request, startsAt);
    if (request.status() != null && !request.status().isBlank()) {
      event.setStatus(request.status());
    }
    eventRepository.save(event);
    audit(user, "event.update", event.getId(), ipAddress);
    initializeOrganizer(event);
    return event;
  }

  /** The signed-in organizer's own events, empty when they have none (NFR-012). */
  @Transactional(readOnly = true)
  public List<Event> listOrganizerEvents(User organizer) {
    List<Event> events = eventRepository.findByOrganizer(organizer);
    events.forEach(this::initializeOrganizer);
    return events;
  }

  /** The public event read path: only a published event is visible. */
  @Transactional(readOnly = true)
  public Event getPublishedEvent(String id) {
    Event event =
        eventRepository
            .findById(id)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "event not found"));
    if (!"published".equals(event.getStatus())) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "event not found");
    }
    initializeOrganizer(event);
    return event;
  }

  public List<TicketType> ticketTypesFor(Event event) {
    return ticketTypeRepository.findByEvent(event);
  }

  /** Forces the lazy organizer proxy to load while the session is still open. */
  private void initializeOrganizer(Event event) {
    event.getOrganizer().getFullName();
  }

  /**
   * AC-016, AC-017: creates a general-admission ticket type with its own independent quantity;
   * NFR-007: only the owning organizer may add one.
   */
  @Transactional
  public TicketType createTicketType(
      User user, String eventId, TicketTypeRequest request, String ipAddress) {
    Event event =
        eventRepository
            .findById(eventId)
            .orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "event not found"));
    if (!event.getOrganizer().getId().equals(user.getId())) {
      throw new ResponseStatusException(HttpStatus.FORBIDDEN, "not the owner of this event");
    }

    Map<String, String> errors = new LinkedHashMap<>();
    if (request.name() == null || request.name().isBlank()) {
      errors.put("name", "is required");
    }
    if (request.priceInr() == null || request.priceInr().signum() <= 0) {
      errors.put("priceInr", "must be a positive amount");
    }
    if (request.quantityTotal() == null || request.quantityTotal() <= 0) {
      errors.put("quantityTotal", "must be a positive quantity");
    }
    if (!errors.isEmpty()) {
      throw new ValidationErrorException(errors);
    }

    TicketType ticketType = new TicketType();
    ticketType.setId(UUID.randomUUID().toString());
    ticketType.setEvent(event);
    ticketType.setName(request.name().strip());
    ticketType.setPriceInr(request.priceInr());
    ticketType.setQuantityTotal(request.quantityTotal());
    ticketType.setQuantitySold(0);
    ticketTypeRepository.save(ticketType);
    audit(user, "ticket_type.create", ticketType.getId(), ipAddress);
    return ticketType;
  }

  private void applyFields(Event event, EventRequest request, LocalDateTime startsAt) {
    event.setTitle(request.title().strip());
    event.setVenue(request.venue().strip());
    event.setCity(request.city().strip());
    event.setCategory(request.category().strip());
    event.setDescription(request.description().strip());
    event.setStartsAt(startsAt);
    event.setPosterUrl(request.posterUrl());
  }

  /** AC-015, NFR-012: one message per missing or invalid required field. */
  private LocalDateTime validate(EventRequest request, Map<String, String> errors) {
    requireText(request.title(), "title", errors);
    requireText(request.venue(), "venue", errors);
    requireText(request.city(), "city", errors);
    requireText(request.category(), "category", errors);
    requireText(request.description(), "description", errors);

    LocalDateTime startsAt = null;
    if (request.startsAt() == null || request.startsAt().isBlank()) {
      errors.put("startsAt", "is required");
    } else {
      try {
        startsAt = LocalDateTime.parse(request.startsAt());
      } catch (DateTimeParseException e) {
        errors.put("startsAt", "must be a valid ISO-8601 date-time");
      }
    }
    return startsAt;
  }

  private void requireText(String value, String field, Map<String, String> errors) {
    if (value == null || value.isBlank()) {
      errors.put(field, "is required");
    }
  }

  private void audit(User actor, String action, String entityId, String ipAddress) {
    AuditLog log = new AuditLog();
    log.setId(UUID.randomUUID().toString());
    log.setActorUser(actor);
    log.setAction(action);
    log.setEntity("events");
    log.setEntityId(entityId);
    log.setIpAddress(ipAddress);
    log.setOutcome("success");
    log.setCreatedAt(LocalDateTime.now());
    auditLogRepository.save(log);
  }
}
