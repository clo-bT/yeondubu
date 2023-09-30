package yeon.dubu.expenditure.repository;

import com.querydsl.core.Tuple;
import yeon.dubu.expenditure.dto.query.ExpenditureGraphDto;
import yeon.dubu.expenditure.dto.query.ExpenditureListDto;

import java.time.YearMonth;
import java.util.List;

public interface CustomMoneyExpenditureRepository {
    List<ExpenditureListDto> searchYearMonth(YearMonth yearMonth, Long coupleId);
    Tuple searchMinMax(Long coupleId);
    List<ExpenditureGraphDto> searchGraph(Long coupleId);
}
