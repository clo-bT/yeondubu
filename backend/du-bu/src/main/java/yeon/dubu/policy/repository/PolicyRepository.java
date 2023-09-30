package yeon.dubu.policy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.policy.domain.Policy;

import java.util.List;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
    List<Policy> findByTagIn(List<String> tags);
}
