package yeon.dubu.expenditure.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.repository.CustomTagExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagExpenditureServiceImpl implements TagExpenditureService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;
    private final TagSecondExpenditureRepository tagSecondExpenditureRepository;
    private final TagThirdExpenditureRepository tagThirdExpenditureRepository;

    /**
     * firstTag 등록
     * @param firstTagName
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TagFirstExpenditure insertFirstTag(String firstTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        TagFirstExpenditure tagFirstExpenditure = TagFirstExpenditure.builder()
                .couple(couple)
                .firstTagName(firstTagName)
                .build();

        tagFirstExpenditureRepository.save(tagFirstExpenditure);

        return tagFirstExpenditure;
    }

    /**
     * secondTag 등록
     * @param firstTagName
     * @param secondTagName
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TagSecondExpenditure insertSecondTag(String firstTagName, String secondTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagFirstExpenditure tagFirstExpenditure = tagFirstExpenditureRepository.findByCoupleAndFirstTagName(couple.getId(), firstTagName).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));

        TagSecondExpenditure tagSecondExpenditure = TagSecondExpenditure.builder()
                .tagFirstExpenditure(tagFirstExpenditure)
                .secondTagName(secondTagName)
                .build();

        tagSecondExpenditureRepository.save(tagSecondExpenditure);

        return tagSecondExpenditure;
    }

    /**
     * thirdTag 등록
     * @param firstTagName
     * @param secondTagName
     * @param thirdTagName
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TagThirdExpenditure insertThirdTag(String firstTagName, String secondTagName, String thirdTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagSecondExpenditure tagSecondExpenditure = tagSecondExpenditureRepository.findByCoupleAndFirstTagNameAndSecondTagName(couple.getId(), firstTagName, secondTagName).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 두번째 태그 정보가 없습니다."));

        TagThirdExpenditure tagThirdExpenditure = TagThirdExpenditure.builder()
                .tagSecondExpenditure(tagSecondExpenditure)
                .thirdTagName(thirdTagName)
                .build();

        tagThirdExpenditureRepository.save(tagThirdExpenditure);

        return tagThirdExpenditure;
    }

    /**
     * couple의 전체 태그 조회(first, second, third)
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public List<AllFirstTagExpenditureResDto> searchAllTags(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

//        Routine[] routines = Routine.values();
//        List<List<PrescriptionRoutineFutureQueryDto>> prescriptionRoutineQueryDtoList = new ArrayList<>();
//        for (Routine routine : routines) {
//            List<PrescriptionRoutineFutureQueryDto> byRoutine = prescriptionRepository.findByRoutineForFuture(routine, member,
//                    dateTime);
//            prescriptionRoutineQueryDtoList.add(byRoutine);
//        }

        // 첫번째 태그 불러오기

        return null;
    }



}
