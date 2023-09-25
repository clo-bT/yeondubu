package yeon.dubu.income.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.income.dto.request.MoneyIncomeReqDto;
import yeon.dubu.income.dto.request.MoneyIncomeUpdateReqDto;
import yeon.dubu.income.dto.response.MoneyIncomeResDto;
import yeon.dubu.income.service.MoneyIncomeService;


@Slf4j
@RestController
@RequestMapping("/api/v1/income")
@RequiredArgsConstructor
public class MoneyIncomeController {
    private final MoneyIncomeService moneyIncomeService;

    @PostMapping
    public ResponseEntity<?> insertIncome(@AuthenticationPrincipal Long userId, @RequestBody MoneyIncomeReqDto moneyIncomeReqDto){
        moneyIncomeService.insertIncome(userId, moneyIncomeReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateIncome(@AuthenticationPrincipal Long userId, @RequestBody MoneyIncomeUpdateReqDto moneyIncomeUpdateReqDto){
        moneyIncomeService.updateIncome(userId, moneyIncomeUpdateReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @DeleteMapping("/{incomeId}")
    public ResponseEntity<?> deleteIncome(@AuthenticationPrincipal Long userId, @PathVariable Long incomeId){
        moneyIncomeService.deleteIncome(incomeId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/month/{year}/{month}")
    public ResponseEntity<?> selectIncomeByYearMonth(@AuthenticationPrincipal Long userId, @PathVariable int year, @PathVariable int month){
        List<MoneyIncomeResDto> moneyIncomeResDtos = moneyIncomeService.selectByYearMonth(userId, year, month);
        return new ResponseEntity<>(moneyIncomeResDtos, HttpStatus.OK);
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<?> selectIncomeByDate(@AuthenticationPrincipal Long userId, @PathVariable LocalDate date){
        List<MoneyIncomeResDto> moneyIncomeResDtos = moneyIncomeService.selectByDate(userId, date);
        return new ResponseEntity<>(moneyIncomeResDtos, HttpStatus.OK);
    }
}
