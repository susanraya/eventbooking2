package app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Session enforcement for the JWT-based auth the approved API spec requires (US-001, US-002,
 * US-003, US-008, US-012, US-013) lives in {@link app.security.JwtAuthenticationFilter}, a plain
 * servlet filter Spring Boot registers independently of this chain; a webhook endpoint instead
 * verifies the Razorpay signature on its own body. This configuration only disables Spring
 * Security's defaults -- generated-password form login, HTTP Basic, and session cookies -- so they
 * never interfere with that filter or the stub handlers in {@code app.api} still awaiting one. CSRF
 * is disabled because this is a stateless JSON API authenticated by bearer token, never by cookie
 * (the frontend and the API are always on different origins once deployed).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

  /** Hashes account passwords (US-001); never stores or compares them in plain text. */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .httpBasic(basic -> basic.disable())
        .formLogin(form -> form.disable())
        .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
    return http.build();
  }
}
