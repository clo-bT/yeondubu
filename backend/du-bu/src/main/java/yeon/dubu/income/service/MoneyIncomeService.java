package yeon.dubu.income.service;

import yeon.dubu.income.dto.request.MoneyIncomeReqDto;
import yeon.dubu.income.dto.request.MoneyIncomeUpdateReqDto;

public interface MoneyIncomeService {

    void insertIncome(Long userId, MoneyIncomeReqDto moneyIncomeReqDto);

    void updateIncome(Long userId, MoneyIncomeUpdateReqDto moneyIncomeUpdateReqDto);

    void deleteIncome(Long incomeId);

}
