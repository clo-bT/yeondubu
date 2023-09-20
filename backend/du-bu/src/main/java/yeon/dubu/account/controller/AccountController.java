package yeon.dubu.account.controller;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.service.AccountService;

@Slf4j
@RestController
@RequestMapping("/api/v1/accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @PostMapping("/saving")
    public ResponseEntity<?> insertSaving(@AuthenticationPrincipal Long userId, @RequestBody SavingAccountReqDto savingAccountReqDto){
        accountService.insertSaving(userId, savingAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.CREATED);
    }

    @PostMapping("/deposit")
    public ResponseEntity<?> insertDeposit(@AuthenticationPrincipal Long userId, @RequestBody
        DepositAccountReqDto depositAccountReqDto){
        accountService.insertDeposit(userId, depositAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.CREATED);
    }

    @PutMapping("/saving/{accountId}")
    public ResponseEntity<?> updateSaving(@AuthenticationPrincipal Long userId, @RequestBody SavingAccountReqDto savingAccountReqDto, @RequestParam Long accountId){
        accountService.updateSaving(userId, accountId, savingAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PutMapping("/deposit/{accountId}")
    public ResponseEntity<?> updateDeposit(@AuthenticationPrincipal Long userId, @RequestBody DepositAccountReqDto depositAccountReqDto, @RequestParam Long accountId){
        accountService.updateDeposit(userId, accountId, depositAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

}
