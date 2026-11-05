package app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security is on the classpath for the JWT-based auth the approved API spec requires
 * (US-001, US-002, US-003, US-008, US-012, US-013), but no endpoint is implemented yet -- every
 * handler in {@code app.api} is still a stub. Securing them now, ahead of a real {@code
 * Authorization: Bearer} filter, would only lock the health check and every stub behind Spring
 * Security's generated-password form login and break the baseline this scaffold must leave green.
 *
 * <p>This configuration disables that default and permits every request. A ticket that implements
 * an endpoint requiring auth (JWT or webhook-signature) adds the real check there -- a {@code
 * JwtAuthenticationFilter} reading {@code JWT_SECRET_KEY}, or a signature check on the Razorpay
 * webhook body -- and narrows {@code authorizeHttpRequests} accordingly. CSRF is disabled because
 * this is a stateless JSON API authenticated by bearer token, never by cookie (the frontend and the
 * API are always on different origins once deployed).
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

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
