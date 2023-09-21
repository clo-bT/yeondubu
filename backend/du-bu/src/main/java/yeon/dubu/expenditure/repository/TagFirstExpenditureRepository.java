package yeon.dubu.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;

import java.util.List;
import java.util.Optional;

public interface TagFirstExpenditureRepository extends JpaRepository<TagFirstExpenditure, Long>, CustomTagExpenditureRepository {

}
