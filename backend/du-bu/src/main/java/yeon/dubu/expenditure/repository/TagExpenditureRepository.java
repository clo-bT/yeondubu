package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.couple.domain.Couple;

import java.util.Optional;
import yeon.dubu.expenditure.domain.TagExpenditure;

public interface TagExpenditureRepository extends JpaRepository<TagExpenditure, Long> {
    Optional<TagExpenditure> findTagExpenditureByCoupleAndFirstTagNameAndSecondTagNameAndThirdTagName(Couple couple, String firstTagName, String secondTagName, String thirdTagName);
}
