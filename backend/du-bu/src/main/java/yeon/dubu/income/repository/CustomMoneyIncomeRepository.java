package yeon.dubu.income.repository;

import com.querydsl.core.Tuple;
import yeon.dubu.income.dto.query.IncomeGraphDto;
import yeon.dubu.income.dto.query.IncomeListDto;

import java.time.YearMonth;
import java.util.List;

public interface CustomMoneyIncomeRepository {
    List<IncomeListDto> searchYearMonth(YearMonth yearMonth, Long coupleId);
    Tuple searchMinMax(Long coupleId);
    List<IncomeGraphDto> searchGraph(Long coupleId);
}
