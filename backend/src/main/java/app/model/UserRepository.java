package app.model;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes User rows; Spring Data implements it. */
public interface UserRepository extends JpaRepository<User, String> {

  Optional<User> findByEmail(String email);
}
