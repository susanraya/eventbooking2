package app.model;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes ConsentRecord rows; Spring Data implements it. */
public interface ConsentRecordRepository extends JpaRepository<ConsentRecord, String> {

  Optional<ConsentRecord> findFirstByUserAndWithdrawnAtIsNullOrderByGrantedAtDesc(User user);
}
