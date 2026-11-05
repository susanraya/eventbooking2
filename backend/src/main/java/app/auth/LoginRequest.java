package app.auth;

/** The POST /auth/login request body. */
public record LoginRequest(String email, String password) {}
