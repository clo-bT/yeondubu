package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;

public interface TagSecondExpenditureRepository extends JpaRepository<TagSecondExpenditure, Long>, CustomTagExpenditureRepository {

}
