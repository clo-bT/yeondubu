package yeon.dubu.income.service;

import java.time.LocalDate;
import java.util.List;
import yeon.dubu.income.dto.request.MoneyIncomeReqDto;
import yeon.dubu.income.dto.request.MoneyIncomeUpdateReqDto;
import yeon.dubu.income.dto.response.MoneyIncomeResDto;

public interface MoneyIncomeService {

    void insertIncome(Long userId, MoneyIncomeReqDto moneyIncomeReqDto);

    void updateIncome(Long userId, MoneyIncomeUpdateReqDto moneyIncomeUpdateReqDto);

    void deleteIncome(Long incomeId);

    List<MoneyIncomeResDto> selectByYearMonth(Long userId, int year, int month);

    List<MoneyIncomeResDto> selectByDate(Long userId, LocalDate date);
}
