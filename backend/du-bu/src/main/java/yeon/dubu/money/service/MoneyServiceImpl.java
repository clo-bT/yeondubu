package yeon.dubu.money.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.dto.query.ExpenditureListDto;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.income.dto.query.IncomeListDto;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.money.dto.response.MoneyYearMonthResDto;
import yeon.dubu.money.dto.response.TotalExpectExpenditureResDto;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;
import yeon.dubu.money.dto.response.MoneyCashResDto;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MoneyServiceImpl implements MoneyService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final MoneyRepository moneyRepository;
    private final MoneyExpenditureRepository moneyExpenditureRepository;
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;


    /**
     * 사용자의 현금 등록
     * @param moneyCashReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Money money = moneyRepository.findByUserId(userId).orElseThrow(() -> new NoSuchMoneyException("사용자의 자산 정보가 없습니다."));

        money.setTotalCash(moneyCashReqDto.getTotalCash());
        moneyRepository.save(money);

        return money;
    }

    /**
     * 사용자의 couple의 총 예상 금액 조회
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TotalExpectExpenditureResDto searchTotalExpectExpenditure(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        User bride = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.BRIDE).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신부 사용자가 없습니다."));
        User groom = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.GROOM).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신랑 사용자가 없습니다."));

        Money brideMoney = moneyRepository.findByUserId(bride.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));
        Money groomMoney = moneyRepository.findByUserId(groom.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        Long totalExpectExpenditure = brideMoney.getExpectExpenditure() + groomMoney.getExpectExpenditure();

        TotalExpectExpenditureResDto totalExpectExpenditureResDto = new TotalExpectExpenditureResDto(totalExpectExpenditure);

        return totalExpectExpenditureResDto;
    }

    @Override
    @Transactional
    public MoneyCashResDto searchTotalCash(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        User bride = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.BRIDE).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신부 사용자가 없습니다."));
        User groom = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.GROOM).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신랑 사용자가 없습니다."));

        Money brideMoney = moneyRepository.findByUserId(bride.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));
        Money groomMoney = moneyRepository.findByUserId(groom.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        MoneyCashResDto moneyCashResDto = MoneyCashResDto.builder()
                .brideTotalCash(brideMoney.getTotalCash())
                .groomTotalCash(groomMoney.getTotalCash())
                .build();

        return moneyCashResDto;
    }

    /**
     * yearMonth로 couple의 수입, 지출 조회
     * @param yearMonth
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public MoneyYearMonthResDto searchYearMonth(YearMonth yearMonth, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        List<ExpenditureListDto> expenditureList = moneyExpenditureRepository.searchYearMonth(yearMonth, userId);
        List<IncomeListDto> incomeList = moneyIncomeRepository.searchYearMonth(yearMonth, userId);
        // date별로 파싱하기

        // YearMonth의 첫째 날부터 마지막 날까지 반복
        List<Map<String, Object>> dayDataList = new ArrayList<>();
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<ExpenditureListDto> expenditureOfDay = expenditureList.stream()
                    .filter(expenditure -> expenditure.getDate().isEqual(date))
                    .collect(Collectors.toList());

            List<IncomeListDto> incomeOfDay = incomeList.stream()
                    .filter(income -> income.getDate().equals(date))
                    .collect(Collectors.toList());

            Map<String, Object> dayData = new HashMap<>();
            dayData.put("expenditureList", expenditureOfDay);
            dayData.put("incomeList", incomeOfDay);

            dayDataList.add(dayData);
        }


        // MoneyYearMonthResDto에 결과 설정
        MoneyYearMonthResDto moneyYearMonthResDto = MoneyYearMonthResDto.builder().build();


        return null;
    }
}
