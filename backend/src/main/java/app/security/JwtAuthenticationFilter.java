package app.security;

import app.model.User;
import app.model.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Enforces the bearer-token session on every request except the handful the approved API spec
 * leaves public ({@code /health}, {@code POST /auth/register}, {@code POST /auth/login}, {@code GET
 * /consent/notice}, {@code GET /events/search}, {@code GET /events/{id}}). A missing, invalid,
 * expired or revoked token on any other endpoint fails closed with 401; a valid one sets the
 * authenticated {@link User} on the security context.
 */
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
  private final TokenRevocationService tokenRevocationService;
  private final UserRepository userRepository;

  public JwtAuthenticationFilter(
      JwtService jwtService,
      TokenRevocationService tokenRevocationService,
      UserRepository userRepository) {
    this.jwtService = jwtService;
    this.tokenRevocationService = tokenRevocationService;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    if (isPublic(request)) {
      filterChain.doFilter(request, response);
      return;
    }

    String header = request.getHeader("Authorization");
    if (header == null || !header.startsWith("Bearer ")) {
      unauthorized(response);
      return;
    }
    String token = header.substring("Bearer ".length()).strip();
    try {
      Jws<Claims> parsed = jwtService.parse(token);
      Claims claims = parsed.getPayload();
      if (tokenRevocationService.isRevoked(claims.getId())) {
        unauthorized(response);
        return;
      }
      User user = userRepository.findById(claims.getSubject()).orElse(null);
      if (user == null) {
        unauthorized(response);
        return;
      }
      SecurityContextHolder.getContext()
          .setAuthentication(new UsernamePasswordAuthenticationToken(user, null, List.of()));
    } catch (RuntimeException e) {
      unauthorized(response);
      return;
    }
    filterChain.doFilter(request, response);
  }

  private boolean isPublic(HttpServletRequest request) {
    String method = request.getMethod();
    String path = request.getRequestURI();
    if ("GET".equals(method) && "/health".equals(path)) {
      return true;
    }
    if ("POST".equals(method) && "/auth/register".equals(path)) {
      return true;
    }
    if ("POST".equals(method) && "/auth/login".equals(path)) {
      return true;
    }
    if ("GET".equals(method) && "/consent/notice".equals(path)) {
      return true;
    }
    if ("GET".equals(method) && "/events/search".equals(path)) {
      return true;
    }
    return "GET".equals(method) && path.matches("/events/[^/]+");
  }

  private void unauthorized(HttpServletResponse response) throws IOException {
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    response.setContentType("application/json");
    response.getWriter().write("{\"error\":\"unauthorized\",\"message\":\"Sign in required.\"}");
  }
}
