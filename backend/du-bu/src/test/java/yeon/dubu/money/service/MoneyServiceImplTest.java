package yeon.dubu.money.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.expenditure.service.MoneyExpenditureService;
import yeon.dubu.expenditure.service.TagFirstExpenditureService;
import yeon.dubu.expenditure.service.TagThirdExpenditureService;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;
import yeon.dubu.money.dto.response.MoneyCashResDto;
import yeon.dubu.money.dto.response.MoneyYearMonthResDto;
import yeon.dubu.money.dto.response.TotalExpectExpenditureResDto;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MoneyServiceImplTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;
    @Autowired
    MoneyRepository moneyRepository;
    @Autowired
    MoneyService moneyService;
    @Autowired
    TagFirstExpenditureRepository tagFirstExpenditureRepository;
    @Autowired
    TagSecondExpenditureRepository tagSecondExpenditureRepository;
    @Autowired
    TagThirdExpenditureRepository tagThirdExpenditureRepository;
    @Autowired
    MoneyExpenditureRepository moneyExpenditureRepository;
    @Autowired
    MoneyExpenditureService moneyExpenditureService;
    @Autowired
    TagFirstExpenditureService tagFirstExpenditureService;
    @Autowired
    TagThirdExpenditureService tagThirdExpenditureService;
    static User USER1;
    static User USER2;
    static TagFirstExpenditure TAG1;
    static TagSecondExpenditure TAG2;
    static TagThirdExpenditure TAG3;

    @BeforeEach
    void beforeEach() {
        Couple couple = Couple.builder()
                .weddingDate(LocalDate.of(2024, 05, 25))
                .build();

        Couple createCouple = coupleRepository.save(couple);

        User user1 = User.builder()
                .name("예비신부")
                .couple(createCouple)
                .userRole(UserRole.BRIDE)
                .roleType(RoleType.USER)
                .build();

        USER1 = userRepository.save(user1);

        User user2 = User.builder()
                .name("예비신랑")
                .couple(createCouple)
                .userRole(UserRole.GROOM)
                .roleType(RoleType.USER)
                .build();

        USER2 = userRepository.save(user2);

        TagFirstExpenditure tagFirstExpenditure = TagFirstExpenditure.builder()
                .couple(couple)
                .firstTagName("혼수")
                .build();

        TAG1 = tagFirstExpenditureRepository.save(tagFirstExpenditure);

        TagSecondExpenditure tagSecondExpenditure = TagSecondExpenditure.builder()
                .tagFirstExpenditure(TAG1)
                .secondTagName("가구")
                .build();

        TAG2 = tagSecondExpenditureRepository.save(tagSecondExpenditure);

        TagThirdExpenditureReqDto tagThirdExpenditureReqDto = TagThirdExpenditureReqDto.builder()
                .secondTagId(TAG2.getId())
                .thirdTagName("침대")
                .build();

        TAG3 = tagThirdExpenditureService.insertThirdTag(tagThirdExpenditureReqDto, USER1.getId());

        // TODO: couple 생성 후 money 생기는 로직 작성 후 삭제필요
        Money money = Money.builder()
                .totalCash(0L)
                .totalAccount(0L)
                .expectExpenditure(0L)
                .completeExpenditure(0L)
                .user(USER1)
                .build();

        moneyRepository.save(money);

        Money money2 = Money.builder()
                .totalCash(0L)
                .totalAccount(0L)
                .expectExpenditure(0L)
                .completeExpenditure(0L)
                .user(USER2)
                .build();

        moneyRepository.save(money2);

    }

    @DisplayName("사용자 현금 등록")
    @Transactional
    @Test
    void insertCash() {
        // given
        MoneyCashReqDto moneyCashReqDto = MoneyCashReqDto.builder()
                .totalCash(1000000L)
                .build();

        // when
        Money insertedCash = moneyService.insertCash(moneyCashReqDto, USER1.getId());

        // then
        assertThat(moneyRepository.findByUserId(USER1.getId()).get().getTotalCash()).isEqualTo(insertedCash.getTotalCash());
    }

    @DisplayName("couple의 총 예상 금액 조회")
    @Test
    @Transactional
    void searchTotalExpectExpenditure() {
        // given
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .payComplete(true)
                .build();

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());
        Optional<MoneyExpenditure> savedExpenditure = moneyExpenditureRepository.findByTagThirdExpenditureId(TAG3.getId());

        // when
        TotalExpectExpenditureResDto totalExpectExpenditure = moneyService.searchTotalExpectExpenditure(USER2.getId());

        // then
        assertThat(moneyRepository.findByUserId(USER1.getId()).get().getExpectExpenditure()).isEqualTo(totalExpectExpenditure.getTotalExpenditure());
    }

    @DisplayName("couple의 현금 조회")
    @Test
    @Transactional
    void searchTotalCash() {
        // given
        MoneyCashReqDto moneyCash1 = MoneyCashReqDto.builder()
                .totalCash(1000000L)
                .build();

        MoneyCashReqDto moneyCash2 = MoneyCashReqDto.builder()
                .totalCash(2000000L)
                .build();

        moneyService.insertCash(moneyCash1, USER1.getId());
        moneyService.insertCash(moneyCash2, USER2.getId());

        // when
        MoneyCashResDto totalCash = moneyService.searchTotalCash(USER2.getId());

        // then
        Long actualCash = totalCash.getBrideTotalCash() + totalCash.getGroomTotalCash();
        assertThat(actualCash).isEqualTo(3000000L);

    }

    @Test
    @Transactional
    void searchYearMonth() {
        // given
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .memo("침대 샀다")
                .payComplete(Boolean.FALSE)
                .build();

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());


        // when
        MoneyYearMonthResDto yearMonthResult = moneyService.searchYearMonth(YearMonth.now(), USER2.getId());

        // then
        assertThat(yearMonthResult.getMaxDate()).isEqualTo(LocalDate.now());

    }

}