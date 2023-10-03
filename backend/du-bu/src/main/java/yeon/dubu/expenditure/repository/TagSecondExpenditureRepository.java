package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;

import java.util.List;

public interface TagSecondExpenditureRepository extends JpaRepository<TagSecondExpenditure, Long>, CustomTagExpenditureRepository {
    List<TagSecondExpenditure> findByTagFirstExpenditureId(Long firstTagId);
}
