package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;

public interface MoneyExpenditureService {
    MoneyExpenditure insertExpenditure(MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId);
}
