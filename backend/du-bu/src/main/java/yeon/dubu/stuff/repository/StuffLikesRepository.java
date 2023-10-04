package yeon.dubu.stuff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.stuff.domain.StuffLikes;

public interface StuffLikesRepository extends JpaRepository<StuffLikes, Long> {
}
