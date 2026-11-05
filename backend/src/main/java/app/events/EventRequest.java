package app.events;

/** The POST /events and PUT /events/{id} request body. */
public record EventRequest(
    String title,
    String venue,
    String city,
    String category,
    String description,
    String startsAt,
    String posterUrl,
    String status) {}
