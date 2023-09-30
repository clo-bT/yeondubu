package yeon.dubu.policy.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.policy.dto.response.PolicyResDto;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
class PolicyServiceImplTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;
    @Autowired
    PolicyService policyService;

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


    @Test
    @Transactional
    void searchByTag() {
        // given

        // when
        List<PolicyResDto> policyResDtos = policyService.searchByTag("경기도", USER1.getId());

        // then
        // TODO: assertion 추가
        assertThat(policyResDtos.get(0).getTag()).isEqualTo("중앙부처");
    }
}