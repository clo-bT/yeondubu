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
import yeon.dubu.account.dto.response.DetailAccountResDto;
import yeon.dubu.account.enumeration.AccountType;
import yeon.dubu.account.exception.NoSuchAccountException;
import yeon.dubu.account.repository.AccountRepository;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.income.exception.NoSuchTagIncomeException;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.income.repository.TagIncomeRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
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
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final TagIncomeRepository tagIncomeRepository;
    private final MoneyRepository moneyRepository;
    private final CoupleRepository coupleRepository;
    @Override
    @Transactional
    public void insertSaving(Long userId, SavingAccountReqDto savingAccountReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Account account = Account.fromSaving(savingAccountReqDto);
        account.setUser(user);
        accountRepository.save(account);

        //총 예적금에 수정
        updateMoneyTotalAccount(user, savingAccountReqDto.getStartAmount());

        //만기일에 income에 추가
        updateIncomeAccountFin(user, savingAccountReqDto.getAccountName(), "적금 만기", savingAccountReqDto.getFinalDate(), savingAccountReqDto.getFinalAmount());

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

        //총 예적금에 수정
        updateMoneyTotalAccount(user, depositAccountReqDto.getStartAmount());

        //만기일에 income에 추가
        updateIncomeAccountFin(user, depositAccountReqDto.getAccountName(), "예금 만기", depositAccountReqDto.getFinalDate(), depositAccountReqDto.getFinalAmount());
    }

    @Override
    @Transactional
    public void updateSaving(Long userId, Long accountId, SavingAccountReqDto savingAccountReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );
        Account account = Account.fromSaving(savingAccountReqDto);

        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        account.setId(savedAccount.getId());
        account.setUser(user);

        //총 예적금에 수정
        updateMoneyTotalAccount(user, - savedAccount.getStartAmount());
        updateMoneyTotalAccount(user, savingAccountReqDto.getStartAmount());
        //근데 이렇게 되면 첫 금액만 수정되고 중간에 스케쥴링을 통해 추가된 부분은 수정되지 않음...

        //만기일에 income 삭제,,
        deleteIncomeAccountFin(user, savingAccountReqDto.getAccountName());
        //만기일에 income에 추가
        updateIncomeAccountFin(user, savingAccountReqDto.getAccountName(), "적금 만기", savingAccountReqDto.getFinalDate(), savingAccountReqDto.getFinalAmount());

        accountRepository.save(account);

    }

    @Override
    @Transactional
    public void updateDeposit(Long userId, Long accountId,
        DepositAccountReqDto depositAccountReqDto) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Account account = Account.fromDeposit(depositAccountReqDto);

        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        account.setId(savedAccount.getId());
        account.setUser(user);
        //총 예적금에 수정
        updateMoneyTotalAccount(user, - savedAccount.getStartAmount());
        updateMoneyTotalAccount(user, depositAccountReqDto.getStartAmount());
        //근데 이렇게 되면 첫 금액만 수정되고 중간에 스케쥴링을 통해 추가된 부분은 수정되지 않음...

        //만기일에 income 삭제,,
        deleteIncomeAccountFin(user, depositAccountReqDto.getAccountName());
        //만기일에 income에 추가
        updateIncomeAccountFin(user, depositAccountReqDto.getAccountName(), "적금 만기", depositAccountReqDto.getFinalDate(), depositAccountReqDto.getFinalAmount());

        accountRepository.save(account);

    }

    @Override
    @Transactional
    public void deleteSaving(Long userId, Long accountId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );
        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        //총 예적금에 수정
        updateMoneyTotalAccount(user, - savedAccount.getStartAmount());
        //만기일에 income 삭제,,
        deleteIncomeAccountFin(user, savedAccount.getName());

        accountRepository.delete(savedAccount);
    }

    @Override
    @Transactional
    public void deleteDeposit(Long userId, Long accountId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );
        Account savedAccount = accountRepository.findById(accountId).orElseThrow(
            () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        //총 예적금에 수정
        updateMoneyTotalAccount(user, - savedAccount.getStartAmount());
        //만기일에 income 삭제,,
        deleteIncomeAccountFin(user, savedAccount.getName());
        accountRepository.delete(savedAccount);
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
            accountInfoResDto.setAccountType(account.getAccountType());
            accountInfoResDtoList.add(accountInfoResDto);
        }
        return accountInfoResDtoList;
    }


    @Override
    public DetailAccountResDto searchDetail(Long accountId) {

        Account account = accountRepository.findById(accountId).orElseThrow(
                () -> new NoSuchAccountException("해당 계좌가 존재하지 않습니다.")
        );
        DetailAccountResDto detailAccountResDto = DetailAccountResDto.from(account);
        return detailAccountResDto;
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

    private void updateMoneyTotalAccount(User user, Long amount){
        Money money = moneyRepository.findByUserId(user.getId()).orElseThrow(
                () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
        );
        money.setTotalAccount(money.getTotalAccount() + amount);
    }

    private void updateIncomeAccountFin(User user, String accountName, String tagName, LocalDate finalDate, Long finalAmount){
        MoneyIncome moneyIncome = new MoneyIncome();
        moneyIncome.setTagIncome(tagIncomeRepository.findByTagName(tagName).orElseThrow(
                () -> new NoSuchTagIncomeException("해당하는 태그가 없습니다.")
        ));

        moneyIncome.setCouple(user.getCouple());
        moneyIncome.setMemo(accountName);
        moneyIncome.setUserRole(user.getUserRole());
        moneyIncome.setDate(finalDate);
        moneyIncome.setAmount(finalAmount);
        moneyIncomeRepository.save(moneyIncome);
    }

    private void deleteIncomeAccountFin(User user, String accountName){
        moneyIncomeRepository.deleteByCoupleIdAndUserRoleAndMemo(user.getCouple().getId(), user.getUserRole(), accountName);
    }
}

