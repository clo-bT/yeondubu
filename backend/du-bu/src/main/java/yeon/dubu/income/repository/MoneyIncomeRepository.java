package yeon.dubu.income.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MoneyIncomeRepository extends JpaRepository<MoneyIncome, Long>, CustomMoneyIncomeRepository {

    void deleteByCoupleIdAndUserRoleAndMemo(Long CoupleId, UserRole userRole, String memo);
    List<MoneyIncome> findByDate(LocalDate date);
}
