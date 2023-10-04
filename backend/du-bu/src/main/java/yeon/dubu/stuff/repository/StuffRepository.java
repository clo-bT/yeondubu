package yeon.dubu.stuff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.stuff.domain.Stuff;

public interface StuffRepository extends JpaRepository<Stuff, Long> {
}
