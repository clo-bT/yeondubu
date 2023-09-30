package yeon.dubu.account.service;

import java.util.List;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.dto.response.AccountInfoResDto;
import yeon.dubu.account.dto.response.DetailAccountResDto;

public interface AccountService {
    void insertSaving(Long userId, SavingAccountReqDto savingAccountReqDto);
    void insertDeposit(Long userId, DepositAccountReqDto depositAccountReqDto);
    void updateSaving(Long userId, Long accountId, SavingAccountReqDto savingAccountReqDto);
    void updateDeposit(Long userId, Long accountId, DepositAccountReqDto depositAccountReqDto);
    void deleteSaving(Long userId, Long accountId);
    void deleteDeposit(Long userId, Long accountId);
    List<AccountInfoResDto> searchAccounts(Long userId);

    DetailAccountResDto searchDetail(Long accountId);
}
