package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.dto.request.TagExpenditureReqDto;

public interface MoneyExpenditureService {
    MoneyExpenditure insertExpenditure(TagExpenditureReqDto.MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId);
}
