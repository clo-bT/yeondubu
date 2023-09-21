package yeon.dubu.account.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.exception.NoSuchAccountException;
import yeon.dubu.account.repository.AccountRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService{
    private UserRepository userRepository;
    private AccountRepository accountRepository;
    @Override
    @Transactional
    public void insertSaving(Long userId, SavingAccountReqDto savingAccountReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Account account = Account.fromSaving(savingAccountReqDto);
        account.setUser(user);

        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void insertDeposit(Long userId, DepositAccountReqDto depositAccountReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Account account = Account.fromDeposit(depositAccountReqDto);
        account.setUser(user);

        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void updateSaving(Long accountId, SavingAccountReqDto savingAccountReqDto) {

        Account account = Account.fromSaving(savingAccountReqDto);

        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        account.setId(savedAccount.getId());

        accountRepository.save(account);

    }

    @Override
    @Transactional
    public void updateDeposit(Long accountId,
        DepositAccountReqDto depositAccountReqDto) {


        Account account = Account.fromDeposit(depositAccountReqDto);

        Account depositAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        account.setId(depositAccount.getId());

        accountRepository.save(account);

    }

    @Override
    @Transactional
    public void deleteSaving(Long accountId) {
        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        accountRepository.delete(savedAccount);
    }

    @Override
    @Transactional
    public void deleteDeposit(Long accountId) {
        Account depositAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        accountRepository.delete(depositAccount);
    }
}
