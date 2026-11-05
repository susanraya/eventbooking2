package app.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes TicketType rows; Spring Data implements it. */
public interface TicketTypeRepository extends JpaRepository<TicketType, String> {

  List<TicketType> findByEvent(Event event);
}
