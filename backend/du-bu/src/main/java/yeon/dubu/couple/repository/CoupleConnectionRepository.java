package yeon.dubu.couple.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.couple.domain.CoupleConnection;

@Repository
public interface CoupleConnectionRepository extends JpaRepository<CoupleConnection, Long> {
    Optional<CoupleConnection> findById(Long userId);

}
