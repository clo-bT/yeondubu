package yeon.dubu.income.controller;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.income.dto.request.MoneyIncomeReqDto;
import yeon.dubu.income.dto.request.MoneyIncomeUpdateReqDto;
import yeon.dubu.income.dto.response.MoneyIncomeResDto;
import yeon.dubu.income.service.MoneyIncomeService;


@Slf4j
@RestController
@RequestMapping("/api/v1/income")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://j9a307.p.ssafy.io:3000", "https://j9a307.p.ssafy.io"})
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

    @GetMapping("/{incomeId}")
    public ResponseEntity<?> searchIncome(@AuthenticationPrincipal Long userId, @PathVariable Long incomeId){
        MoneyIncomeResDto moneyIncomeResDto = moneyIncomeService.searchIncome(userId, incomeId);
        return new ResponseEntity<>(moneyIncomeResDto, HttpStatus.OK);
    }

}
