package yeon.dubu.income.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.income.domain.TagIncome;

@Repository
public interface TagIncomeRepository extends JpaRepository<TagIncome, Long> {

}
