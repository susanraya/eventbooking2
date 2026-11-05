package app.auth;

/** The POST /auth/register request body: attendee fields, plus organizer-only ones. */
public record RegisterRequest(
    String email,
    String password,
    String fullName,
    String phone,
    String role,
    String organizationName,
    String contactDetails,
    boolean consentGiven,
    String noticeVersion) {}
