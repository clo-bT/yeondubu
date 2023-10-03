package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;

import java.util.List;

public interface TagThirdExpenditureRepository extends JpaRepository<TagThirdExpenditure, Long>, CustomTagExpenditureRepository {
    List<TagThirdExpenditure> findByTagSecondExpenditureId(Long secondTagId);
}
