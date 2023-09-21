package yeon.dubu.account.service;

import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;

public interface AccountService {
    void insertSaving(Long userId, SavingAccountReqDto savingAccountReqDto);
    void insertDeposit(Long userId, DepositAccountReqDto depositAccountReqDto);
    void updateSaving(Long accountId, SavingAccountReqDto savingAccountReqDto);
    void updateDeposit(Long accountId, DepositAccountReqDto depositAccountReqDto);
    void deleteSaving(Long accountId);
    void deleteDeposit(Long accountId);
}
