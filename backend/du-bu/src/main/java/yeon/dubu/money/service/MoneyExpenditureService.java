package yeon.dubu.money.service;

import yeon.dubu.money.domain.MoneyExpenditure;
import yeon.dubu.money.dto.request.MoneyExpenditureReqDto;

public interface MoneyExpenditureService {
    MoneyExpenditure insertExpenditure(MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId);
}
