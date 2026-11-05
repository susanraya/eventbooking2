package app.model;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** Reads and writes Event rows; Spring Data implements it. */
public interface EventRepository extends JpaRepository<Event, String> {

  List<Event> findByOrganizer(User organizer);
}
