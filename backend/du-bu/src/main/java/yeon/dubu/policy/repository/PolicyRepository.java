package yeon.dubu.policy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.policy.domain.Policy;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
}
