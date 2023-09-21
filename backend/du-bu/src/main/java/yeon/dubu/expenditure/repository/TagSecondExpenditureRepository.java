package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;

import java.util.Optional;

public interface TagSecondExpenditureRepository extends JpaRepository<TagSecondExpenditure, Long> {
    Optional<TagSecondExpenditure> findByCoupleAndFirstTagNameAndSecondTagName(Long coupleId, String firstTagName, String secondTagName);

}
