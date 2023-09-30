package yeon.dubu.money.service;

import yeon.dubu.money.dto.response.*;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;

import java.time.YearMonth;
import java.util.List;

public interface MoneyService {
    Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId);
    TotalExpectExpenditureResDto searchTotalExpectExpenditure(Long userId);

    MoneyCashResDto searchTotalCash(Long userId);
    MoneyAccountResDto searchTotalAccount(Long userId); // 함께 이만큼 모았어요
    MoneyYearMonthResDto searchYearMonth(YearMonth yearMonth, Long userId); // 달력
    List<MoneyGraphResDto> searchGraph(Long userId); // 그래프
}
