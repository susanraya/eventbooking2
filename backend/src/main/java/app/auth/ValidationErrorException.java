package app.auth;

import java.util.Map;

/** Registration input failed validation; carries one message per offending field. */
public class ValidationErrorException extends RuntimeException {

  private final transient Map<String, String> errors;

  public ValidationErrorException(Map<String, String> errors) {
    super("validation failed");
    this.errors = errors;
  }

  public Map<String, String> getErrors() {
    return errors;
  }
}
