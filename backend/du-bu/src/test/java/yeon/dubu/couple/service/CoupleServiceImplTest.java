package yeon.dubu.couple.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class CoupleServiceImplTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;
    @Autowired
    CoupleService coupleService;

    static Couple COUPLE1;
    static User USER1;
    static User USER2;
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


    }
    @Test
    @Transactional
    void deleteCouple() {
        // given

        // when
        coupleService.deleteCouple(USER1.getId());

        // then
        assertThat(coupleRepository.findById(COUPLE1.getId())).isEmpty();

    }
}