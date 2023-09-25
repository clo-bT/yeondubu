package yeon.dubu.money.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.user.domain.User;

import java.util.Optional;

public interface MoneyRepository extends JpaRepository<Money, Long> {
    Optional<Money> findByUser(User user);

}
