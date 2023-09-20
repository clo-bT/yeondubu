package yeon.dubu.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.couple.domain.Couple;

import java.util.Optional;

public interface TagExpenditureRepository extends JpaRepository<TagExpenditure, Long> {
    Optional<TagExpenditure> findTagExpenditureByCoupleAndFirstTagNameAndSecondTagNameAndThirdTagName(Couple couple, String firstTagName, String secondTagName, String thirdTagName);
}
