package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;

import java.util.Optional;

public interface MoneyExpenditureRepository extends JpaRepository<MoneyExpenditure, Long>, CustomMoneyExpenditureRepository {
    Optional<MoneyExpenditure> findByTagThirdExpenditure(TagThirdExpenditure tagThirdExpenditure);
}
