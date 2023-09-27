package yeon.dubu.expenditure.repository;

import yeon.dubu.expenditure.dto.query.ExpenditureListDto;

import java.time.YearMonth;
import java.util.List;

public interface CustomMoneyExpenditureRepository {
    List<ExpenditureListDto> searchYearMonth(YearMonth yearMonth, Long coupleId);

}
