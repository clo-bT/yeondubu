package yeon.dubu.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.money.domain.MoneyExpenditure;

public interface MoneyExpenditureRepository extends JpaRepository<MoneyExpenditure, Long> {
}
