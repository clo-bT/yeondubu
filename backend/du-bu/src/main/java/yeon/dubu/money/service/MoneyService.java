package yeon.dubu.money.service;

import yeon.dubu.money.dto.response.TotalExpectExpenditureResDto;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;
import yeon.dubu.money.dto.response.MoneyCashResDto;

public interface MoneyService {
    Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId);
    TotalExpectExpenditureResDto searchTotalExpectExpenditure(Long userId);

    MoneyCashResDto searchTotalCash(Long userId);
}
