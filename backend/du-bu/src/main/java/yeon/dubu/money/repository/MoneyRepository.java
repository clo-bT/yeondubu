package yeon.dubu.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.money.domain.Money;

import java.util.Optional;

public interface MoneyRepository extends JpaRepository<Money, Long>, CustomMoneyRepository {
    Optional<Money> findByUserId(Long userId);


}
