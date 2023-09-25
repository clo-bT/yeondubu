package yeon.dubu.expenditure.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureUpdateDto;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TagSecondExpenditureServiceImplTest {
    @Autowired
    TagExpenditureService tagExpenditureService;
    @Autowired
    TagSecondExpenditureService tagSecondExpenditureService;
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

    TagSecondExpenditureReqDto tagSecondExpenditureReqDto;

    static User USER1;
    static User USER2;
    static TagFirstExpenditure TAG1;

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

    }

    @Test
    @Transactional
    void insertSecondTag() {
        // given
        TagSecondExpenditureReqDto secondExpenditureReqDto = TagSecondExpenditureReqDto.builder()
                .firstTagId(TAG1.getId())
                .secondTagName("혼수")
                .build();

        // when
        TagSecondExpenditure tagSecondExpenditure = tagSecondExpenditureService.insertSecondTag(secondExpenditureReqDto, USER1.getId());

        // then
        assertThat(tagSecondExpenditureRepository.findById(tagSecondExpenditure.getId()).get().getSecondTagName()).isEqualTo("혼수");

    }

    @Test
    @Transactional
    void updateSecondTag() {
        // given
        TagSecondExpenditureReqDto secondExpenditureReqDto = TagSecondExpenditureReqDto.builder()
                .firstTagId(TAG1.getId())
                .secondTagName("혼수")
                .build();

        TagSecondExpenditure tagSecondExpenditure = tagSecondExpenditureService.insertSecondTag(secondExpenditureReqDto, USER1.getId());


        // when
        TagSecondExpenditureUpdateDto tagSecondExpenditureUpdateDto = TagSecondExpenditureUpdateDto.builder()
                .secondTagId(tagSecondExpenditure.getId())
                .secondTagName("수정된 두번째 태그")
                .build();

        tagSecondExpenditureService.updateSecondTag(tagSecondExpenditureUpdateDto, USER1.getId());

        // then
        assertThat(tagSecondExpenditureRepository.findById(tagSecondExpenditure.getId()).get().getSecondTagName()).isEqualTo(tagSecondExpenditureUpdateDto.getSecondTagName());
    }
}