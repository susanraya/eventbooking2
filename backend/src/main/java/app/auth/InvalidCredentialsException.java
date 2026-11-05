package app.auth;

/**
 * A sign-in attempt used an unknown email or the wrong password. The response names neither field
 * (AC-007, NFR-002): the caller cannot tell which was wrong.
 */
public class InvalidCredentialsException extends RuntimeException {

  public InvalidCredentialsException() {
    super("invalid credentials");
  }
}
