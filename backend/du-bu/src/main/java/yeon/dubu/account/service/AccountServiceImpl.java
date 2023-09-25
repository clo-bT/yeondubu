package yeon.dubu.account.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.dto.request.SavingAccountReqDto;
import yeon.dubu.account.dto.response.AccountInfoResDto;
import yeon.dubu.account.enumeration.AccountType;
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
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
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

    @Override
    public List<AccountInfoResDto> searchAccounts(Long userId) {
        List<Account> accountList = accountRepository.findByUserId(userId);
        List<AccountInfoResDto> accountInfoResDtoList = new ArrayList<>();

        for(Account account : accountList){
            Long price;
            if(account.getAccountType().equals(AccountType.SAVINGS))
                price = calNowMoney(account);
            else price = account.getFinalAmount();


            AccountInfoResDto accountInfoResDto = new AccountInfoResDto();
            accountInfoResDto.setName(account.getName());
            accountInfoResDto.setPrice(price);
            accountInfoResDto.setId(account.getId());

            accountInfoResDtoList.add(accountInfoResDto);
        }
        return accountInfoResDtoList;
    }

    private Long calNowMoney(Account account){
        LocalDate today = LocalDate.now();

        int nowMonth = today.getMonthValue();
        int nowYear = today.getYear();
        int nowDay = today.getDayOfMonth();

        int createdYear = account.getCreatedAt().getYear();
        int createdMonth = account.getCreatedAt().getMonthValue();
        int createdDay = account.getCreatedAt().getDayOfMonth();

        int transferDay = account.getTransferDay();

        Long startPrice = account.getStartAmount();

        int totalMonths = 0;
        //년
        totalMonths += 12 * (nowYear - createdYear - 1);

        //월
        if (nowMonth >= createdMonth){
            totalMonths += nowMonth - createdMonth + 12;
        }
        else{
            totalMonths += 12 - (createdMonth - nowMonth);
        }

        //일
        if(nowDay < transferDay) totalMonths -= 1;
        if(createdDay < transferDay) totalMonths += 1;

        return startPrice + (totalMonths * account.getTransferAmount());
    }
}

