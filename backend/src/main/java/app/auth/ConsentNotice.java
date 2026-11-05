package app.auth;

import java.util.List;

/**
 * The current DPDP consent notice: a specific, unbundled list of purposes and the version of the
 * notice a registrant is agreeing to. Registration stores consent against these purposes rather
 * than whatever the client happens to send, so the record always reflects what was actually
 * disclosed.
 */
public final class ConsentNotice {

  public static final String CURRENT_VERSION = "2026-01";

  public static final List<String> PURPOSES =
      List.of(
          "account_creation_and_authentication",
          "event_ticket_booking_and_fulfilment",
          "service_and_transactional_communications");

  private ConsentNotice() {}
}
