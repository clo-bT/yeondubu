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
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

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
    MoneyExpenditureService moneyExpenditureService;

    MoneyExpenditureReqDto moneyExpenditureReqDto;

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

        TagThirdExpenditure tagThirdExpenditure = TagThirdExpenditure.builder()
                .tagSecondExpenditure(TAG2)
                .thirdTagName("침대")
                .build();
        TAG3 = tagThirdExpenditureRepository.save(tagThirdExpenditure);
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
                .date(LocalDate.of(2023, 10, 6))
                .amount(100000L)
                .memo("침대 샀다")
                .build();

        MoneyExpenditure moneyExpenditure = moneyExpenditureService.insertExpenditure(moneyExpenditureReqDto, USER1.getId());

        // then
        assertThat(moneyExpenditureRepository.findById(moneyExpenditure.getId()).get().getTagThirdExpenditure()).isEqualTo(TAG3);
    }
}