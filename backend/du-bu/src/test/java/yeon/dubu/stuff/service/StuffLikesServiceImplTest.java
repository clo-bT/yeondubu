package yeon.dubu.stuff.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.stuff.domain.StuffLikes;
import yeon.dubu.stuff.dto.response.StuffLikesResDto;
import yeon.dubu.stuff.repository.StuffLikesRepository;
import yeon.dubu.stuff.repository.StuffRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
class StuffLikesServiceImplTest {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CoupleRepository coupleRepository;
    @Autowired
    StuffRepository stuffRepository;
    @Autowired
    StuffLikesRepository stuffLikesRepository;
    @Autowired
    StuffLikesService stuffLikesService;

    static Couple COUPLE;
    static User USER1;
    static User USER2;
    @BeforeEach
    void beforeEach() {
        Couple couple = Couple.builder()
                .weddingDate(LocalDate.of(2024, 05, 25))
                .build();

        COUPLE = coupleRepository.save(couple);

        User user1 = User.builder()
                .name("예비신부")
                .couple(COUPLE)
                .userRole(UserRole.BRIDE)
                .roleType(RoleType.USER)
                .build();

        USER1 = userRepository.save(user1);

        User user2 = User.builder()
                .name("예비신랑")
                .couple(COUPLE)
                .userRole(UserRole.GROOM)
                .roleType(RoleType.USER)
                .build();

        USER2 = userRepository.save(user2);
    }

    @DisplayName("좋아요")
    @Test
    @Transactional
    void createStuffLikes() {
        // given
        String category = "appliances";
        String subCategory = "refrigerator";
        Long itemId = 1L;

        // when
        stuffLikesService.createStuffLikes(category, subCategory, itemId, USER1.getId());

        // then
        assertThat(stuffLikesRepository.findByCoupleId(COUPLE.getId()).get(0).getStuff().getCategory()).isEqualTo(category);
        assertThat(stuffLikesRepository.findByCoupleId(COUPLE.getId()).get(0).getStuff().getSubCategory()).isEqualTo(subCategory);

    }

    @DisplayName("좋아요 리스트 조회")
    @Test
    @Transactional
    void searchStuffLikes() {
        // given
        String category1 = "appliances";
        String subCategory1 = "refrigerator";
        Long itemId1 = 1L;
        stuffLikesService.createStuffLikes(category1, subCategory1, itemId1, USER1.getId());

        String category2 = "furniture";
        String subCategory2 = "bed";
        Long itemId2 = 2L;
        stuffLikesService.createStuffLikes(category2, subCategory2, itemId2, USER1.getId());

        // when
        List<StuffLikesResDto> stuffLikesList = stuffLikesService.searchStuffLikes(USER1.getId());
        List<StuffLikes> likesList = stuffLikesRepository.findByCoupleId(COUPLE.getId());
        System.out.println("stuffLikesList = " + stuffLikesList);
        System.out.println("likesList = " + likesList);
        // then
        assertThat(stuffLikesList.size()).isEqualTo(2);

    }

    @DisplayName("좋아요 취소")
    @Test
    void deleteStuffLikes() {
        // given
        String category1 = "appliances";
        String subCategory1 = "refrigerator";
        Long itemId1 = 1L;
        stuffLikesService.createStuffLikes(category1, subCategory1, itemId1, USER1.getId());

        // when
        List<StuffLikes> byCoupleId = stuffLikesRepository.findByCoupleId(COUPLE.getId());
        stuffLikesService.deleteStuffLikes(byCoupleId.get(0).getId(), USER1.getId());

        // then
        assertThat(stuffLikesRepository.findByCoupleId(COUPLE.getId())).isEmpty();
    }
}