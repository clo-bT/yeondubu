package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;

import java.util.Optional;

public interface TagFirstExpenditureRepository extends JpaRepository<TagFirstExpenditure, Long> {
    Optional<TagFirstExpenditure> findByCoupleAndFirstTagName(Long coupleId, String firstTagName);
}
