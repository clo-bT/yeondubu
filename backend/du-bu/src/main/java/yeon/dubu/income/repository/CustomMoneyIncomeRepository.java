package yeon.dubu.income.repository;

import yeon.dubu.income.dto.query.IncomeListDto;

import java.time.YearMonth;
import java.util.List;

public interface CustomMoneyIncomeRepository {
    List<IncomeListDto> searchYearMonth(YearMonth yearMonth, Long coupleId);
}