package yeon.dubu.user.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.user.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByCoupleId(Long coupleId);
}
