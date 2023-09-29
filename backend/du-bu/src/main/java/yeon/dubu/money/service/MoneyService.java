package yeon.dubu.money.service;

import yeon.dubu.money.dto.response.MoneyAccountResDto;
import yeon.dubu.money.dto.response.MoneyYearMonthResDto;
import yeon.dubu.money.dto.response.TotalExpectExpenditureResDto;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;
import yeon.dubu.money.dto.response.MoneyCashResDto;

import java.time.YearMonth;

public interface MoneyService {
    Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId);
    TotalExpectExpenditureResDto searchTotalExpectExpenditure(Long userId);

    MoneyCashResDto searchTotalCash(Long userId);
    MoneyAccountResDto searchTotalAccount(Long userId); // 함께 이만큼 모았어요
    MoneyYearMonthResDto searchYearMonth(YearMonth yearMonth, Long userId); // 달력
}
