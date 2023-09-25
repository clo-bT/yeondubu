package yeon.dubu.couple.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.domain.CoupleConnection;

@Repository
public interface CoupleRepository extends JpaRepository<Couple, Long> {

}
