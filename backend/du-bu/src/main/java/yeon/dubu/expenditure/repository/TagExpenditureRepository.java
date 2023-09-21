package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagExpenditure;

public interface TagExpenditureRepository extends JpaRepository<TagExpenditure, Long> {

}
