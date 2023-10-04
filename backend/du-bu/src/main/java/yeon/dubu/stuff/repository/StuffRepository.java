package yeon.dubu.stuff.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.stuff.domain.Stuff;

import java.util.Optional;

public interface StuffRepository extends JpaRepository<Stuff, Long> {
    Optional<Stuff> findByCategoryAndSubCategory(String category, String subCategory);
}
