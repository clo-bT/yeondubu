package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;

public interface MoneyExpenditureRepository extends JpaRepository<MoneyExpenditure, Long> {
}
