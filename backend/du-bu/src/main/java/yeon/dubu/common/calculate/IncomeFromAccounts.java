package yeon.dubu.common.calculate;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.enumeration.AccountType;
import yeon.dubu.account.repository.AccountRepository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class IncomeFromAccounts {
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final MoneyRepository moneyRepository;
    //해당 달의 커플 예적금 총액을 구한다. (그래프 조회용)
    public Long calAmountOfMonth(Long userId, LocalDate lastDayOfMonth){
        User loginUser = userRepository.findById(userId).orElseThrow(
                () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );
        Long sum = 0L;

        List<User> users = userRepository.findByCoupleId(loginUser.getCouple().getId());

        for(User user : users){
            List<Account> accounts = accountRepository.findByUserId(user.getId());

            for(Account account : accounts){
                if (account.getFinalDate().isBefore(lastDayOfMonth)){ //만기가 안된 애들만
                    if(account.getAccountType().equals(AccountType.SAVINGS)){ //적금이면
                        Long tmpSum = account.getStartAmount();
                        int year = lastDayOfMonth.getYear();
                        int month = lastDayOfMonth.getMonthValue();
                        int sumOfMonth = (year - account.getCreatedAt().getYear() - 1) * 12;
                        sumOfMonth += month + 12 - account.getCreatedAt().getMonthValue();

                        tmpSum += account.getTransferAmount() * sumOfMonth;
                        sum += tmpSum;
                    }
                    else{
                        sum += account.getFinalAmount();
                    }
                }
            }
        }
        return sum;
    }

    //해당 일에 해당하는 income을 현금에 추가한다.(미래수입들을 보유 현금에 추가)
    @Transactional
    public void addIncomeToMoney(LocalDate today){
        List<MoneyIncome> moneyIncomes = moneyIncomeRepository.findByDate(today);
        for(MoneyIncome moneyIncome : moneyIncomes){
            User user = userRepository.findByCoupleIdAndUserRole(moneyIncome.getCouple().getId(),
                    moneyIncome.getUserRole()).orElseThrow(
                    () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
            );
            Money money = moneyRepository.findByUserId(user.getId()).orElseThrow(
                    () -> new NoSuchUserException("해당하는 자산 정보가 없습니다.")
            );
            money.setTotalCash(money.getTotalCash() + moneyIncome.getAmount());
        }
    }
    //transferDay가 오늘 dayOfMonth인 예적금을 가져와서 transferAmount만큼 총 예적금에 추가한다.(적금일에 예적금 금액 추가)
    @Transactional
    public void addAccountToMoney(LocalDate today){
        List<Account> accounts = accountRepository.findByTransferDay(today.getDayOfMonth());
        for(Account account : accounts){
            if(account.getFinalDate().isBefore(today)){ //만기일이 지나지 않은 애들만
                User user = account.getUser();
                Money money = moneyRepository.findByUserId(user.getId()).orElseThrow(
                        () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
                );
                money.setTotalAccount(account.getTransferAmount());
            }
        }
    }
}
