package yeon.dubu.income.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.income.domain.TagIncome;

@Repository
public interface TagIncomeRepository extends JpaRepository<TagIncome, Long> {
    Optional<TagIncome> findByTagName(String tagName);
}
