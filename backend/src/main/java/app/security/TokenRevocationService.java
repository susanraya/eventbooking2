package app.security;

import java.time.Duration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * Marks a session token's id (jti) revoked in Redis for exactly as long as the token itself would
 * otherwise remain valid, so sign-out ends a session (NFR-003) without the revocation entry
 * outliving the token it covers.
 *
 * <p>Redis here is a disposable cache (ENVIRONMENT.md): every call degrades rather than fails when
 * Redis is unavailable, so login and logout keep working and a token's own expiry still bounds the
 * session, only without early revocation.
 */
@Service
public class TokenRevocationService {

  private static final Logger LOG = LoggerFactory.getLogger(TokenRevocationService.class);
  private static final String KEY_PREFIX = "revoked-jwt:";

  private final StringRedisTemplate redisTemplate;

  public TokenRevocationService(StringRedisTemplate redisTemplate) {
    this.redisTemplate = redisTemplate;
  }

  /** Revokes {@code jti} for {@code ttl}; a no-op once the token it names has already expired. */
  public void revoke(String jti, Duration ttl) {
    if (jti == null || ttl.isZero() || ttl.isNegative()) {
      return;
    }
    try {
      redisTemplate.opsForValue().set(KEY_PREFIX + jti, "1", ttl);
    } catch (RuntimeException e) {
      LOG.warn("Redis unavailable; could not record revocation for token id {}", jti);
    }
  }

  /** Whether {@code jti} was revoked; fails open (not revoked) when Redis is unreachable. */
  public boolean isRevoked(String jti) {
    if (jti == null) {
      return false;
    }
    try {
      return Boolean.TRUE.equals(redisTemplate.hasKey(KEY_PREFIX + jti));
    } catch (RuntimeException e) {
      LOG.warn("Redis unavailable; treating token id {} as not revoked", jti);
      return false;
    }
  }
}
