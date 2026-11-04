package app;

import java.util.Map;
import java.util.TreeMap;

/**
 * The backing services this application is configured to reach.
 *
 * <p>Each entry maps a service to the environment variable that addresses it, so the health check
 * reports what the running deployment can actually reach.
 */
public final class Services {

  static final Map<String, String> SERVICES =
      Map.ofEntries(
          Map.entry("meilisearch", "MEILI_URL"),
          Map.entry("redis", "REDIS_URL"),
          Map.entry("redis-queue", "REDIS_URL"));

  private Services() {}

  /** Each service mapped to whether its connection variable is set. */
  static Map<String, Boolean> configured() {
    Map<String, Boolean> configured = new TreeMap<>();
    SERVICES.forEach((name, variable) -> configured.put(name, System.getenv(variable) != null));
    return configured;
  }
}
