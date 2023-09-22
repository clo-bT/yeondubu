package yeon.dubu.expenditure.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.service.MoneyExpenditureService;

import java.net.URISyntaxException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/expenditure")
public class MoneyExpenditureController {

    private final MoneyExpenditureService moneyExpenditureService;

    /**
     * couple의 예산안 or 지출 등록
     * @param userId
     * @param moneyExpenditureReqDto
     * @return
     * @throws URISyntaxException
     */
    @PostMapping("/money")
    public ResponseEntity insertExpenditure(
            @AuthenticationPrincipal Long userId,
            @RequestBody MoneyExpenditureReqDto moneyExpenditureReqDto
    ) throws URISyntaxException {

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, userId);

        return ResponseEntity.ok(moneyExpenditure);
    }
}