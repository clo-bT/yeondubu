package yeon.dubu.money.service;


import com.querydsl.core.Tuple;
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
import yeon.dubu.money.dto.query.MoneyListDto;
import yeon.dubu.money.dto.response.MoneyAccountResDto;
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
import java.util.List;
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

    // TODO: test code 작성
    @Override
    @Transactional
    public MoneyAccountResDto searchTotalAccount(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        User bride = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.BRIDE).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신부 사용자가 없습니다."));
        User groom = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.GROOM).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신랑 사용자가 없습니다."));

        Money brideMoney = moneyRepository.findByUserId(bride.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));
        Money groomMoney = moneyRepository.findByUserId(groom.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        MoneyAccountResDto moneyAccountResDto = MoneyAccountResDto.builder()
                .brideTotalAccount(brideMoney.getTotalAccount())
                .groomTotalAccount(groomMoney.getTotalAccount())
                .build();

        return moneyAccountResDto;
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

        // min, max date
        Tuple incomeMinMax = moneyIncomeRepository.searchMinMax(couple.getId());
        Tuple expenditureMinMax = moneyExpenditureRepository.searchMinMax(couple.getId());

        LocalDate incomeMinDate = incomeMinMax.get(0, LocalDate.class);
        LocalDate expenditureMinDate = expenditureMinMax.get(0, LocalDate.class);
        LocalDate minDate = (incomeMinDate != null && (expenditureMinDate == null || incomeMinDate.isBefore(expenditureMinDate)))
                ? incomeMinDate
                : expenditureMinDate;


        LocalDate incomeMaxDate = incomeMinMax.get(1, LocalDate.class);
        LocalDate expenditureMaxDate = expenditureMinMax.get(1, LocalDate.class);
        LocalDate maxDate = (incomeMaxDate != null && (expenditureMaxDate == null || incomeMaxDate.isAfter(expenditureMaxDate)))
                ? incomeMaxDate
                : expenditureMaxDate;


        // moneyList
        List<IncomeListDto> incomeListDtos = moneyIncomeRepository.searchYearMonth(yearMonth, couple.getId());
        List<ExpenditureListDto> expenditureListDtos = moneyExpenditureRepository.searchYearMonth(yearMonth, couple.getId());
        System.out.println("1111expenditureListDtos = " + expenditureListDtos);
        List<MoneyListDto> moneyListDtos = new ArrayList<>();
        LocalDate startDate = yearMonth.atDay(1);
        LocalDate endDate = yearMonth.atEndOfMonth();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {

            final LocalDate currentDate = date;

            List<IncomeListDto> incomeOfDay = incomeListDtos.stream()
                    .filter(income -> income.getDate().equals(currentDate))
                    .collect(Collectors.toList());

            List<ExpenditureListDto> expenditureOfDay = expenditureListDtos.stream()
                    .filter(expenditure -> expenditure.getDate().isEqual(currentDate))
                    .collect(Collectors.toList());

            Long income = incomeOfDay.stream()
                    .mapToLong(IncomeListDto::getAmount)
                    .sum();

            Long expenditure = expenditureOfDay.stream()
                    .mapToLong(ExpenditureListDto::getAmount)
                    .sum();

            MoneyListDto moneyListDto = MoneyListDto.builder()
                    .date(currentDate)
                    .income(income)
                    .expenditure(expenditure)
                    .incomeList(incomeOfDay)
                    .expenditureList(expenditureOfDay)
                    .build();

            moneyListDtos.add(moneyListDto);
        }

        // result
        MoneyYearMonthResDto moneyYearMonthResDto = MoneyYearMonthResDto.builder()
                .minDate(minDate)
                .maxDate(maxDate)
                .moneyList(moneyListDtos)
                .build();

        return moneyYearMonthResDto;
    }

}
