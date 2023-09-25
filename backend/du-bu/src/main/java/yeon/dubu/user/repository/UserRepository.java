package yeon.dubu.user.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByCoupleId(Long coupleId);
    Optional<User> findByCoupleIdAndAndUserRole(Long coupleId, UserRole userRole);

}
