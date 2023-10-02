package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;

import java.util.List;

public interface TagFirstExpenditureRepository extends JpaRepository<TagFirstExpenditure, Long>, CustomTagExpenditureRepository {
    List<TagFirstExpenditure> findByCoupleId(Long coupleId);
}
