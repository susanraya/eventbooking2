package app.auth;

/** A registration attempt used an email that already has an account. */
public class EmailInUseException extends RuntimeException {

  public EmailInUseException(String email) {
    super("email already in use: " + email);
  }
}
