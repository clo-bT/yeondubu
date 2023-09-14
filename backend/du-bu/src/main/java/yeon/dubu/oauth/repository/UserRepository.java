package yeon.dubu.oauth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.oauth.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
