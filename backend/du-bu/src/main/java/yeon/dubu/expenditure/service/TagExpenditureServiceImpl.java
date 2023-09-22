package yeon.dubu.expenditure.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllSecondTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllThirdTagExpenditureResDto;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
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
     * couple의 전체 태그 조회(first, second, third)
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public List<AllFirstTagExpenditureResDto> searchAllTags(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        List<AllFirstTagExpenditureResDto> allTags = tagFirstExpenditureRepository.searhAllTags(couple.getId());

        return allTags;
    }

    /**
     * couple의 전체 태그 조회(first, second, third)
     * @param userId
     * @return
     */
//    @Override
//    @Transactional
//    public List<AllFirstTagExpenditureResDto> searchAllTags(Long userId) {
//        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
//        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
//
//        // firstTag 불러오기
//        List<AllFirstTagExpenditureResDto> allFirstTagList = tagFirstExpenditureRepository.searchFirstTagByCouple(couple.getId());
//        List<AllFirstTagExpenditureResDto> firstList = new ArrayList<>();
//        for (AllFirstTagExpenditureResDto firstTag : allFirstTagList) {
//            String firstTagName = firstTag.getFirstTagName();
//
//            List<AllSecondTagExpenditureResDto> allSecondTagList = tagSecondExpenditureRepository.searchSecondTagByCouple(couple.getId(), firstTagName);
//
//            // firstTag에 속하는 secondTag
//            List<AllSecondTagExpenditureResDto> secondList = new ArrayList<>();
//            for (AllSecondTagExpenditureResDto secondTag : allSecondTagList) {
//                String secondTagName = secondTag.getSecondTagName();
//
//                // secondTag에 속하는 thirdTag
//                List<AllThirdTagExpenditureResDto> allThirdTagList = tagThirdExpenditureRepository.searchThirdTagByCouple(couple.getId(), secondTagName);
//                AllSecondTagExpenditureResDto allSecondTagExpenditureResDto = AllSecondTagExpenditureResDto.builder()
//                        .secondTagId(secondTag.getSecondTagId())
//                        .secondTagName(secondTag.getSecondTagName())
//                        .allThirdTagList(allThirdTagList)
//                        .build();
//                secondList.add(allSecondTagExpenditureResDto);
//            }
//
//            AllFirstTagExpenditureResDto allFirstTagExpenditureResDto = AllFirstTagExpenditureResDto.builder()
//                    .firstTagId(firstTag.getFirstTagId())
//                    .firstTagName(firstTag.getFirstTagName())
//                    .allSecondTagList(secondList)
//                    .build();
//            firstList.add(allFirstTagExpenditureResDto);
//        }
//
//        return firstList;
//    }



}
