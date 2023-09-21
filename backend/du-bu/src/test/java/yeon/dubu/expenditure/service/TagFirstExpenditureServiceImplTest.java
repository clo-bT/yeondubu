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
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TagFirstExpenditureServiceImplTest {
    @Autowired
    TagExpenditureService tagExpenditureService;
    @Autowired
    TagFirstExpenditureService tagFirstExpenditureService;
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
        System.out.println("user1 = " + user1);
        USER1 = userRepository.save(user1);

        System.out.println("USER1 = " + USER1);

        User user2 = User.builder()
                .name("예비신랑")
                .couple(createCouple)
                .userRole(UserRole.GROOM)
                .roleType(RoleType.USER)
                .build();

        USER2 = userRepository.save(user2);

    }
    @DisplayName("insert firstTag")
    @Test
    @Transactional
    void insertFirstTag() {
        // given
        String firstTagName = "혼수";

        // when
        TagFirstExpenditure tagFirstExpenditure = tagFirstExpenditureService.insertFirstTag(firstTagName, USER1.getId());

        // then
        assertThat(tagFirstExpenditureRepository.findById(tagFirstExpenditure.getId()).get().getFirstTagName()).isEqualTo(firstTagName);

    }
}