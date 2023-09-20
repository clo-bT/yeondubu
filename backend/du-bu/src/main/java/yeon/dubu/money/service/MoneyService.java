package yeon.dubu.money.service;

import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;

public interface MoneyService {
    Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId);
}
