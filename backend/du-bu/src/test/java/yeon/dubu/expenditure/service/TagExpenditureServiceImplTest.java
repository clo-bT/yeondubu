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
import yeon.dubu.expenditure.dto.response.TagAllExpenditureResDto;
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
import java.util.List;

@SpringBootTest
class TagExpenditureServiceImplTest {

    @Autowired
    TagExpenditureService tagExpenditureService;
    @Autowired
    TagFirstExpenditureRepository tagFirstExpenditureRepository;
    @Autowired
    TagSecondExpenditureRepository tagSecondExpenditureRepository;
    @Autowired
    TagThirdExpenditureRepository tagThirdExpenditureRepository;
    @Autowired
    MoneyExpenditureRepository moneyExpenditureRepository;
    @Autowired
    TagFirstExpenditureService tagFirstExpenditureService;

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;
    @Autowired
    MoneyRepository moneyRepository;
    
    static Couple COUPLE1;
    static User USER1;
    static User USER2;

    static TagFirstExpenditure TAG1;
    static TagSecondExpenditure TAG2;
    static TagSecondExpenditure TAG22;
    static TagThirdExpenditure TAG31;
    static TagThirdExpenditure TAG32;
    static TagThirdExpenditure TAG33;
    static Money MONEY1;
    static Money MONEY2;
    @BeforeEach
    void beforeEach() {
        Couple couple = Couple.builder()
                .weddingDate(LocalDate.of(2024, 05, 25))
                .build();

        COUPLE1 = coupleRepository.save(couple);

        User user1 = User.builder()
                .name("예비신부")
                .couple(COUPLE1)
                .userRole(UserRole.BRIDE)
                .roleType(RoleType.USER)
                .build();

        USER1 = userRepository.save(user1);

        User user2 = User.builder()
                .name("예비신랑")
                .couple(COUPLE1)
                .userRole(UserRole.GROOM)
                .roleType(RoleType.USER)
                .build();

        USER2 = userRepository.save(user2);

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

        MONEY2 = moneyRepository.save(money2);

        TagFirstExpenditure tagFirstExpenditure = TagFirstExpenditure.builder()
                .couple(couple)
                .firstTagName("혼수")
                .build();

        TAG1 = tagFirstExpenditureRepository.save(tagFirstExpenditure);

        tagFirstExpenditureService.insertFirstTag("첫번째 태그", USER1.getId());

        TagSecondExpenditure tagSecondExpenditure = TagSecondExpenditure.builder()
                .tagFirstExpenditure(TAG1)
                .secondTagName("가구")
                .build();

        TAG2 = tagSecondExpenditureRepository.save(tagSecondExpenditure);

        TagSecondExpenditure tagSecondExpenditure2 = TagSecondExpenditure.builder()
                .tagFirstExpenditure(TAG1)
                .secondTagName("가전")
                .build();

        TAG22 = tagSecondExpenditureRepository.save(tagSecondExpenditure2);

        TagThirdExpenditure tagThirdExpenditure = TagThirdExpenditure.builder()
                .tagSecondExpenditure(TAG2)
                .thirdTagName("침대")
                .build();
        TAG31 = tagThirdExpenditureRepository.save(tagThirdExpenditure);

        TagThirdExpenditure tagThirdExpenditure2 = TagThirdExpenditure.builder()
                .tagSecondExpenditure(TAG2)
                .thirdTagName("의자")
                .build();

        TAG32 = tagThirdExpenditureRepository.save(tagThirdExpenditure2);

        TagThirdExpenditure thirdExpenditure3 = TagThirdExpenditure.builder()
                .tagSecondExpenditure(TAG22)
                .thirdTagName("에어컨")
                .build();

        TAG33 = tagThirdExpenditureRepository.save(thirdExpenditure3);


    }

    @DisplayName("사용자의 커플의 전체 태그 조회")
    @Test
    @Transactional
    void searchAllTags() {
        // given
        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .tagThirdExpenditure(TAG31)
                .date(LocalDate.of(2023, 6, 9))
                .userRole(UserRole.BRIDE)
                .amount(10000L)
                .payComplete(Boolean.FALSE)
                .build();

        MoneyExpenditure saved = moneyExpenditureRepository.save(moneyExpenditure);

        MoneyExpenditure moneyExpenditure2 = MoneyExpenditure.builder()
                .tagThirdExpenditure(TAG32)
                .date(LocalDate.of(2023, 6, 9))
                .userRole(UserRole.BRIDE)
                .amount(10000L)
                .payComplete(Boolean.FALSE)
                .build();

        moneyExpenditureRepository.save(moneyExpenditure2);

        MoneyExpenditure moneyExpenditure3 = MoneyExpenditure.builder()
                .tagThirdExpenditure(TAG33)
                .date(LocalDate.of(2023, 6, 9))
                .userRole(UserRole.BRIDE)
                .amount(10000L)
                .payComplete(Boolean.FALSE)
                .build();

        moneyExpenditureRepository.save(moneyExpenditure3);

        // when
        List<TagAllExpenditureResDto> allTags = tagExpenditureService.searchAllTags(USER1.getId());


        // then
        System.out.println("allTags.toString() = " + allTags.toString());

    }

    @Test
    @Transactional
    void createFirstTags() {
        // given

        // when
        tagExpenditureService.createFirstTags(COUPLE1.getId());

        // then
        List<TagAllExpenditureResDto> allTags = tagExpenditureService.searchAllTags(USER1.getId());
        System.out.println("allTags = " + allTags);
    }
}