package yeon.dubu.account.service;

import java.util.List;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.dto.response.AccountInfoResDto;
import yeon.dubu.account.dto.response.DepositAccountResDto;
import yeon.dubu.account.dto.response.SavingAccountResDto;

public interface AccountService {
    void insertSaving(Long userId, SavingAccountReqDto savingAccountReqDto);
    void insertDeposit(Long userId, DepositAccountReqDto depositAccountReqDto);
    void updateSaving(Long userId, Long accountId, SavingAccountReqDto savingAccountReqDto);
    void updateDeposit(Long accountId, DepositAccountReqDto depositAccountReqDto);
    void deleteSaving(Long accountId);
    void deleteDeposit(Long accountId);
    List<AccountInfoResDto> searchAccounts(Long userId);

    SavingAccountResDto searchSaving(Long accountId);

    DepositAccountResDto searchDeposit(Long accountId);
}
