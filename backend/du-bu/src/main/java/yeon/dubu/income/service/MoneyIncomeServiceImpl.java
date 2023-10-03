package yeon.dubu.income.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.income.dto.request.MoneyIncomeReqDto;
import yeon.dubu.income.dto.request.MoneyIncomeUpdateReqDto;
import yeon.dubu.income.exception.NoSuchMoneyIncomeException;
import yeon.dubu.income.exception.NoSuchTagIncomeException;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.income.repository.TagIncomeRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MoneyIncomeServiceImpl implements MoneyIncomeService{
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final TagIncomeRepository tagIncomeRepository;
    private final MoneyRepository moneyRepository;
    @Override
    public void insertIncome(Long userId, MoneyIncomeReqDto moneyIncomeReqDto) {
        MoneyIncome moneyIncome = MoneyIncome.fromReqDto(moneyIncomeReqDto);
        Couple couple = getCoupleByUserId(userId);
        moneyIncome.setCouple(couple);
        moneyIncome.setTagIncome(tagIncomeRepository.findById(moneyIncomeReqDto.getTagId()).orElseThrow(
            () -> new NoSuchTagIncomeException("올바른 카테고리가 아닙니다.")
        ));

        moneyIncomeRepository.save(moneyIncome);

        LocalDate date = moneyIncomeReqDto.getDate();
        LocalDate now = LocalDate.now();
        if(date.isAfter(now)) return;
        User targetUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), moneyIncomeReqDto.getUserRole()).orElseThrow(
            () -> new NoSuchUserException("해당 유저가 없습니다.")
        );
        Money money = moneyRepository.findByUserId(targetUser.getId()).orElseThrow(
            () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
        );
        money.setTotalCash(money.getTotalCash() + moneyIncomeReqDto.getAmount());
    }

    @Override
    public void updateIncome(Long userId, MoneyIncomeUpdateReqDto moneyIncomeUpdateReqDto) {
        MoneyIncome beforeIncome = moneyIncomeRepository.findById(moneyIncomeUpdateReqDto.getId()).orElseThrow(
            () -> new NoSuchMoneyIncomeException("해당 수입이 없습니다.")
        );
        MoneyIncome moneyIncome = MoneyIncome.fromUpdateReqDto(moneyIncomeUpdateReqDto);

        Couple couple = getCoupleByUserId(userId);
        moneyIncome.setCouple(couple);
        moneyIncome.setTagIncome(tagIncomeRepository.findById(moneyIncomeUpdateReqDto.getTagId()).orElseThrow(
            () -> new NoSuchTagIncomeException("올바른 카테고리가 아닙니다.")
        ));
        moneyIncomeRepository.save(moneyIncome);

        LocalDate date = moneyIncomeUpdateReqDto.getDate();
        LocalDate now = LocalDate.now();
        if(date.isAfter(now)) return;

        if(beforeIncome.getUserRole().equals(moneyIncome.getUserRole())) {
            User targetUser = userRepository.findByCoupleIdAndUserRole(couple.getId(),
                moneyIncomeUpdateReqDto.getUserRole()).orElseThrow(
                () -> new NoSuchUserException("해당 유저가 없습니다.")
            );
            Money money = moneyRepository.findByUserId(targetUser.getId()).orElseThrow(
                () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
            );
            money.setTotalCash(
                money.getTotalCash() + (moneyIncome.getAmount() - beforeIncome.getAmount()));
        }
        else{
            User beforeUser = userRepository.findByCoupleIdAndUserRole(couple.getId(),
                beforeIncome.getUserRole()).orElseThrow(
                () -> new NoSuchUserException("해당 유저가 없습니다.")
            );
            Money beforeMoney = moneyRepository.findByUserId(beforeUser.getId()).orElseThrow(
                () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
            );
            beforeMoney.setTotalCash(beforeMoney.getTotalCash() - beforeIncome.getAmount());

            User afterUser = userRepository.findByCoupleIdAndUserRole(couple.getId(),
                moneyIncome.getUserRole()).orElseThrow(
                () -> new NoSuchUserException("해당 유저가 없습니다.")
            );

            Money afterMoney = moneyRepository.findByUserId(beforeUser.getId()).orElseThrow(
                () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
            );
            afterMoney.setTotalCash(afterMoney.getTotalCash() + moneyIncome.getAmount());

        }
    }

    @Override
    public void deleteIncome(Long incomeId) {
        MoneyIncome beforeMoney = moneyIncomeRepository.findById(incomeId).orElseThrow(
            () -> new NoSuchMoneyIncomeException("해당 수입이 없습니다.")
        );
        moneyIncomeRepository.deleteById(incomeId);

        LocalDate date = beforeMoney.getDate();
        LocalDate now = LocalDate.now();
        if(date.isAfter(now)) return;

        Couple couple = beforeMoney.getCouple();
        User targetUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), beforeMoney.getUserRole()).orElseThrow(
            () -> new NoSuchUserException("해당 유저가 없습니다.")
        );
        Money money = moneyRepository.findByUserId(targetUser.getId()).orElseThrow(
            () -> new NoSuchMoneyException("해당하는 자산 정보가 없습니다.")
        );
        money.setTotalCash(money.getTotalCash() - beforeMoney.getAmount());
    }


    public Couple getCoupleByUserId(Long userId){
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Long coupleId = user.getCouple().getId();

        Couple couple = coupleRepository.findById(coupleId).orElseThrow(
            () -> new NoSuchCoupleException("해당 커플이 없습니다.")
        );
        return couple;
    }
}
