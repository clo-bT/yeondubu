package yeon.dubu.stuff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.stuff.domain.StuffLikes;

import java.util.List;

public interface StuffLikesRepository extends JpaRepository<StuffLikes, Long>, CustomStuffLikesRepository {
    List<StuffLikes> findByCoupleId(Long coupleId);
}
