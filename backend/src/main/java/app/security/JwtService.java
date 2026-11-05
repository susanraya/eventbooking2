package app.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Issues and verifies the stateless session JWTs returned to a signed-in user. Signed with {@code
 * JWT_SECRET_KEY} -- never the platform's {@code SECRET_KEY}, which only authenticates
 * server-to-server calls -- read here as {@code app.jwt.secret}. There is no cookie: a caller
 * authenticates later requests with {@code Authorization: Bearer <token>}, which works across the
 * SPA's and the API's different origins.
 */
@Component
public class JwtService {

  private static final long EXPIRATION_MILLIS = 24L * 60 * 60 * 1000;

  private final SecretKey key;

  public JwtService(@Value("${app.jwt.secret}") String secret) {
    this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
  }

  /** A signed session token identifying this user, carrying their email and role. */
  public String issue(String userId, String email, String role) {
    Instant now = Instant.now();
    return Jwts.builder()
        .subject(userId)
        .claim("email", email)
        .claim("role", role)
        .issuedAt(Date.from(now))
        .expiration(Date.from(now.plusMillis(EXPIRATION_MILLIS)))
        .signWith(key)
        .compact();
  }

  /** The verified claims of a token; throws if the signature, expiry or shape is wrong. */
  public Jws<Claims> parse(String token) {
    return Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
  }
}
