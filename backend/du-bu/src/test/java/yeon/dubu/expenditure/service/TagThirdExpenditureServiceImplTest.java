//package yeon.dubu.expenditure.service;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//import yeon.dubu.auth.enumeration.RoleType;
//import yeon.dubu.couple.domain.Couple;
//import yeon.dubu.couple.repository.CoupleRepository;
//import yeon.dubu.expenditure.domain.TagFirstExpenditure;
//import yeon.dubu.expenditure.domain.TagSecondExpenditure;
//import yeon.dubu.expenditure.domain.TagThirdExpenditure;
//import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
//import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
//import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
//import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
//import yeon.dubu.user.domain.User;
//import yeon.dubu.user.enumeration.UserRole;
//import yeon.dubu.user.repository.UserRepository;
//
//import java.time.LocalDate;
//
//import static org.assertj.core.api.Assertions.assertThat;
//@SpringBootTest
//class TagThirdExpenditureServiceImplTest {
//    @Autowired
//    TagExpenditureService tagExpenditureService;
//    @Autowired
//    TagFirstExpenditureService tagFirstExpenditureService;
//    @Autowired
//    TagSecondExpenditureService tagSecondExpenditureService;
//    @Autowired
//    TagThirdExpenditureService tagThirdExpenditureService;
//    @Autowired
//    TagFirstExpenditureRepository tagFirstExpenditureRepository;
//    @Autowired
//    TagSecondExpenditureRepository tagSecondExpenditureRepository;
//    @Autowired
//    TagThirdExpenditureRepository tagThirdExpenditureRepository;
//
//    @Autowired
//    UserRepository userRepository;
//    @Autowired
//    CoupleRepository coupleRepository;
//
//    TagThirdExpenditureReqDto tagThirdExpenditureReqDto;
//
//    static User USER1;
//    static User USER2;
//    static TagFirstExpenditure TAG1;
//    static TagSecondExpenditure TAG2;
//
//    @BeforeEach
//    void beforeEach() {
//        Couple couple = Couple.builder()
//                .weddingDate(LocalDate.of(2024, 05, 25))
//                .build();
//
//        Couple createCouple = coupleRepository.save(couple);
//
//        User user1 = User.builder()
//                .name("예비신부")
//                .couple(createCouple)
//                .userRole(UserRole.BRIDE)
//                .roleType(RoleType.USER)
//                .build();
//
//        USER1 = userRepository.save(user1);
//
//        User user2 = User.builder()
//                .name("예비신랑")
//                .couple(createCouple)
//                .userRole(UserRole.GROOM)
//                .roleType(RoleType.USER)
//                .build();
//
//        USER2 = userRepository.save(user2);
//
//        TagFirstExpenditure tagFirstExpenditure = TagFirstExpenditure.builder()
//                .couple(couple)
//                .firstTagName("혼수")
//                .build();
//
//        TAG1 = tagFirstExpenditureRepository.save(tagFirstExpenditure);
//
//        TagSecondExpenditure tagSecondExpenditure = TagSecondExpenditure.builder()
//                .tagFirstExpenditure(TAG1)
//                .secondTagName("가구")
//                .build();
//
//        TAG2 = tagSecondExpenditureRepository.save(tagSecondExpenditure);
//
//    }
//    @Test
//    @Transactional
//    void insertThirdTag() {
//        // given
//        TagThirdExpenditureReqDto thirdExpenditureReqDto = TagThirdExpenditureReqDto.builder()
//                .firstTagId(TAG1.getId())
//                .secondTagId(TAG2.getId())
//                .thirdTagName("침대")
//                .build();
//
//        // when
//        TagThirdExpenditure tagThirdExpenditure = tagThirdExpenditureService.insertThirdTag(thirdExpenditureReqDto, USER1.getId());
//
//        // then
//        assertThat(tagThirdExpenditureRepository.findById(tagThirdExpenditure.getId()).get().getThirdTagName()).isEqualTo("침대");
//
//
//    }
//}