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
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;

    static User USER1;
    static User USER2;

    static TagFirstExpenditure TAG1;
    static TagSecondExpenditure TAG2;
    static TagThirdExpenditure TAG31;
    static TagThirdExpenditure TAG32;
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

        TagSecondExpenditure tagSecondExpenditure2 = TagSecondExpenditure.builder()
                .tagFirstExpenditure(TAG1)
                .secondTagName("가전")
                .build();

        tagSecondExpenditureRepository.save(tagSecondExpenditure2);

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
                .build();

        MoneyExpenditure saved = moneyExpenditureRepository.save(moneyExpenditure);

        MoneyExpenditure moneyExpenditure2 = MoneyExpenditure.builder()
                .tagThirdExpenditure(TAG32)
                .date(LocalDate.of(2023, 6, 9))
                .userRole(UserRole.BRIDE)
                .amount(10000L)
                .build();

        moneyExpenditureRepository.save(moneyExpenditure2);

        // when
        List<TagAllExpenditureResDto> allTags = tagExpenditureService.searchAllTags(USER1.getId());


        // then
        System.out.println("allTags.toString() = " + allTags.toString());

    }
}