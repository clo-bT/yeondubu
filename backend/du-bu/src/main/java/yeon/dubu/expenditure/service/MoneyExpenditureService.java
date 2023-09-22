package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureUpdateReqDto;

import java.time.LocalDate;

public interface MoneyExpenditureService {
    MoneyExpenditure insertExpenditure(MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId);
    void updateUserExpenditure(Long amount, LocalDate date, Long userId);
    void updateExpenditure(MoneyExpenditureUpdateReqDto moneyExpenditureUpdateReqDto, Long userId);
}
