package yeon.dubu.income.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.income.domain.MoneyIncome;

@Repository
public interface MoneyIncomeRepository extends JpaRepository<MoneyIncome, Long> {

}
