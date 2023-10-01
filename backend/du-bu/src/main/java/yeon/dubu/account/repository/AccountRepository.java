package yeon.dubu.account.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.account.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
    List<Account> findByTransferDay(int day);
}
