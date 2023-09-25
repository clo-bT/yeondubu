package yeon.dubu.income.service;

import java.time.LocalDate;
import java.util.List;
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
import yeon.dubu.income.dto.response.MoneyIncomeResDto;
import yeon.dubu.income.exception.NoSuchTagIncomeException;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.income.repository.TagIncomeRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MoneyIncomeServiceImpl implements MoneyIncomeService{
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final TagIncomeRepository tagIncomeRepository;
    @Override
    public void insertIncome(Long userId, MoneyIncomeReqDto moneyIncomeReqDto) {
        MoneyIncome moneyIncome = MoneyIncome.fromReqDto(moneyIncomeReqDto);

        moneyIncome.setCouple(getCoupleByUserId(userId));
        moneyIncome.setTagIncome(tagIncomeRepository.findById(moneyIncomeReqDto.getTagId()).orElseThrow(
            () -> new NoSuchTagIncomeException("올바른 카테고리가 아닙니다.")
        ));
        moneyIncomeRepository.save(moneyIncome);
    }

    @Override
    public void updateIncome(Long userId, MoneyIncomeUpdateReqDto moneyIncomeUpdateReqDto) {
        MoneyIncome moneyIncome = MoneyIncome.fromUpdateReqDto(moneyIncomeUpdateReqDto);

        moneyIncome.setCouple(getCoupleByUserId(userId));
        moneyIncome.setTagIncome(tagIncomeRepository.findById(moneyIncomeUpdateReqDto.getTagId()).orElseThrow(
            () -> new NoSuchTagIncomeException("올바른 카테고리가 아닙니다.")
        ));
        moneyIncomeRepository.save(moneyIncome);
    }

    @Override
    public void deleteIncome(Long incomeId) {
        moneyIncomeRepository.deleteById(incomeId);
    }

    @Override
    public List<MoneyIncomeResDto> selectByYearMonth(Long userId, int year, int month) {
        // 전체+ - 금액(day별로),  first last date,
        return null;
    }

    @Override
    public List<MoneyIncomeResDto> selectByDate(Long userId, LocalDate date) {
        //기존
        return null;
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
