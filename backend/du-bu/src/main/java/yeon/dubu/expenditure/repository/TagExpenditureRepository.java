package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagExpenditure;

import java.util.Optional;

public interface TagExpenditureRepository extends JpaRepository<TagExpenditure, Long> {
    Optional<TagExpenditure> findTagExpenditureByCoupleAndFirstTagNameAndSecondTagNameAndThirdTagName(Long userId, String firstTagName, String secondTagName, String thirdTagName);
}
