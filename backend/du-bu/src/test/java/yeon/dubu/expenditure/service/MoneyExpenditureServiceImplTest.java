package yeon.dubu.expenditure.service;

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
import yeon.dubu.expenditure.dto.request.MoneyExpenditureUpdateReqDto;
import yeon.dubu.expenditure.dto.response.MoneyExpenditureDetailResDto;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.as;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class MoneyExpenditureServiceImplTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;

    @Autowired
    TagFirstExpenditureRepository tagFirstExpenditureRepository;
    @Autowired
    TagSecondExpenditureRepository tagSecondExpenditureRepository;
    @Autowired
    TagThirdExpenditureRepository tagThirdExpenditureRepository;
    @Autowired
    MoneyExpenditureRepository moneyExpenditureRepository;
    @Autowired
    MoneyRepository moneyRepository;
    @Autowired
    MoneyExpenditureService moneyExpenditureService;
    MoneyExpenditureReqDto moneyExpenditureReqDto;

    static User USER1;
    static User USER2;
    static TagFirstExpenditure TAG1;
    static TagSecondExpenditure TAG2;
    static TagThirdExpenditure TAG3;
    static Money MONEY1;

    @BeforeEach
    void beforeEach() {
        Couple couple = Couple.builder()
                .weddingDate(LocalDate.of(2024, 5, 25))
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

        TagThirdExpenditure tagThirdExpenditure = TagThirdExpenditure.builder()
                .tagSecondExpenditure(TAG2)
                .thirdTagName("침대")
                .build();
        TAG3 = tagThirdExpenditureRepository.save(tagThirdExpenditure);

        // TODO: couple 생성 후 money 생기는 로직 작성 후 삭제필요
        Money money = Money.builder()
                .totalCash(0L)
                .totalAccount(0L)
                .expectExpenditure(0L)
                .completeExpenditure(0L)
                .user(USER1)
                .build();

        MONEY1 = moneyRepository.save(money);

        Money money2 = Money.builder()
                .totalCash(0L)
                .totalAccount(0L)
                .expectExpenditure(0L)
                .completeExpenditure(0L)
                .user(USER2)
                .build();

        moneyRepository.save(money2);
    }

    @DisplayName("사용자의 예산안 등록")
    @Test
    @Transactional
    void insertExpenditure() {
        // given

        // when
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .memo("침대 샀다")
                .payComplete(false)
                .build();

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());

        // then
        assertThat(moneyExpenditureRepository.findById(moneyExpenditure.getId()).get().getTagThirdExpenditure()).isEqualTo(TAG3);
        assertThat(moneyRepository.findByUser(USER1).get().getExpectExpenditure()).isEqualTo(moneyExpenditureReqDto.getAmount());
    }

    @DisplayName("사용자의 지출 내역 수정")
    @Test
    @Transactional
    void updateExpenditure() {
        // given
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .memo("침대 샀다")
                .payComplete(false)
                .build();

        MoneyExpenditure savedExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());

        // when
        MoneyExpenditureUpdateReqDto moneyExpenditureUpdateReqDto = MoneyExpenditureUpdateReqDto.builder()
                .expenditureId(savedExpenditure.getId())
                .userRole(UserRole.GROOM)
                .date(LocalDate.now().minusDays(3))
                .amount(400L)
                .memo("수정된 메모")
                .payComplete(true)
                .build();
        
        moneyExpenditureService.updateExpenditure(moneyExpenditureUpdateReqDto, USER1.getId());

        // then
        assertThat(moneyRepository.findByUser(USER2).get().getExpectExpenditure()).isEqualTo(moneyExpenditureUpdateReqDto.getAmount());
        assertThat(moneyRepository.findByUser(USER1).get().getExpectExpenditure()).isEqualTo(0L);
    }

    @DisplayName("지출 내역 조회")
    @Test
    @Transactional
    void searchExpenditure() {
        // given
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .payComplete(false)
                .build();

        moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());
        
        // when
        MoneyExpenditureDetailResDto expectExpenditure = moneyExpenditureService.searchExpenditure(TAG3.getId(), USER1.getId());

        // then
        System.out.println("expectExpenditure = " + expectExpenditure);
        assertThat(moneyExpenditureRepository.findByTagThirdExpenditure(TAG3).get().getId()).isEqualTo(expectExpenditure.getExpenditureId());
        
        
    }
    @DisplayName("지출 내역 삭제")
    @Test
    @Transactional
    void deleteExpenditure() {
        // given
        MoneyExpenditureReqDto moneyExpenditureReqDto = MoneyExpenditureReqDto.builder()
                .thirdTagId(TAG3.getId())
                .userRole(UserRole.BRIDE)
                .date(LocalDate.now())
                .amount(100000L)
                .payComplete(true)
                .build();

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());

        // when
        moneyExpenditureService.deleteExpenditure(moneyExpenditure.getId(), USER2.getId());

        // then
        assertThat(moneyExpenditureRepository.findById(moneyExpenditure.getId())).isEmpty();
        assertThat(moneyRepository.findByUser(USER1).get().getExpectExpenditure()).isEqualTo(0L);
        assertThat(moneyRepository.findByUser(USER1).get().getCompleteExpenditure()).isEqualTo(0L);
    }
}