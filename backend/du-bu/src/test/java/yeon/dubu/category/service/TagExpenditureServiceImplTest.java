package yeon.dubu.category.service;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.expenditure.domain.TagExpenditure;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.repository.TagExpenditureRepository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.expenditure.service.TagExpenditureService;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

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
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;

    static User USER1;
    static User USER2;

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

    }

    /**
     * firstTag 등록
     */
    @Transactional
    @Test
    void saveFirstTag() {
        // given
        String firstTagName = "혼수";

        // when
        TagFirstExpenditure tagFirstExpenditure = tagExpenditureService.insertFirstTag(firstTagName, USER1.getId());

        // then
        assertThat(tagFirstExpenditureRepository.findById(tagFirstExpenditure.getId()).get().getFirstTagName()).isEqualTo(firstTagName);


    }

    /**
     * secondTag 등록
     */
    @Transactional
    @Test
    void saveSecondTag() {
        // given
        String firstTagName = "혼수";
        String secondTagName = "가구";

        // when
        TagSecondExpenditure tagSecondExpenditure = tagExpenditureService.insertSecondTag(firstTagName, secondTagName, USER1.getId());

        // then
        assertThat(tagSecondExpenditureRepository.findById(tagSecondExpenditure.getId()).get().getSecondTagName()).isEqualTo(secondTagName);

    }

    /**
     * thirdTag 등록
     */
    @Transactional
    @Test
    void saveThirdTag() {
        // given
        String firstTagName = "혼수";
        String secondTagName = "가구";
        String thirdTagName = "침대";

        // when
        TagThirdExpenditure tagThirdExpenditure = tagExpenditureService.insertThirdTag(firstTagName, secondTagName, thirdTagName, USER1.getId());

        // then
        assertThat(tagThirdExpenditureRepository.findById(tagThirdExpenditure.getId()).get().getThirdTagName()).isEqualTo(thirdTagName);

    }
}