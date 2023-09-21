package yeon.dubu.account.controller;

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
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.dto.response.AccountInfoResDto;
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
    public ResponseEntity<?> updateSaving(@AuthenticationPrincipal Long userId, @RequestBody SavingAccountReqDto savingAccountReqDto, @PathVariable Long accountId){
        accountService.updateSaving(accountId, savingAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PutMapping("/deposit/{accountId}")
    public ResponseEntity<?> updateDeposit(@AuthenticationPrincipal Long userId, @RequestBody DepositAccountReqDto depositAccountReqDto, @PathVariable Long accountId){
        accountService.updateDeposit(accountId, depositAccountReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @DeleteMapping("/saving/{accountId}")
    public ResponseEntity<?> deleteSaving(@AuthenticationPrincipal Long userId, @PathVariable Long accountId){
        accountService.deleteSaving(accountId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @DeleteMapping("/deposit/{accountId}")
    public ResponseEntity<?> deleteDeposit(@AuthenticationPrincipal Long userId, @PathVariable Long accountId){
        accountService.deleteDeposit(accountId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> searchAccounts(@AuthenticationPrincipal Long userId){
        List<AccountInfoResDto> accountInfoResDtoList = accountService.searchAccounts(userId);
        return new ResponseEntity<List<AccountInfoResDto>>(accountInfoResDtoList, HttpStatus.OK);
    }
}
