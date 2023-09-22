package yeon.dubu.expenditure.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.dto.query.AllTagsExpenditureQueryDto;
import yeon.dubu.expenditure.dto.response.TagAllExpenditureResDto;
import yeon.dubu.expenditure.dto.response.TagSecondExpenditureDto;
import yeon.dubu.expenditure.dto.response.TagThirdExpenditureDto;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
    public List<TagAllExpenditureResDto> searchAllTags(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        // 전체 태그 조회
        List<AllTagsExpenditureQueryDto> allTags = tagFirstExpenditureRepository.searchAllTag(couple.getId());

        Map<Long, TagAllExpenditureResDto> firstTagMap = new LinkedHashMap<>();

        for (AllTagsExpenditureQueryDto dto : allTags) {

            Long firstTagId = dto.getFirstTagId();

            // firstTagMap에 존재하지 않으면
            if (!firstTagMap.containsKey(firstTagId)) {

                // 첫번째 만들기
                TagAllExpenditureResDto firstTagDto = TagAllExpenditureResDto.builder()
                        .firstTagId(dto.getFirstTagId())
                        .firstTagName(dto.getFirstTagName())
                        .tagSecondExpenditureDtoList(new ArrayList<>())
                        .build();

                // 두번째 만들기
                TagSecondExpenditureDto secondTagDto = TagSecondExpenditureDto.builder()
                        .secondTagId(dto.getSecondTagId())
                        .secondTagName(dto.getSecondTagName())
                        .tagThirdExpenditureDtoList(new ArrayList<>())
                        .build();

                // 세번째 만들기
                TagThirdExpenditureDto thirdTagDto = TagThirdExpenditureDto.builder()
                        .thirdTagId(dto.getThirdTagId())
                        .thirdTagName(dto.getThirdTagName())
                        .moneyExpenditureId(dto.getMoneyExpenditureId())
                        .amount(dto.getAmount())
                        .build();

                // 세번째 담기, 두번째 담기
                secondTagDto.getTagThirdExpenditureDtoList().add(thirdTagDto);
                firstTagDto.getTagSecondExpenditureDtoList().add(secondTagDto);
                firstTagMap.put(firstTagId, firstTagDto);  // firstTagMap에 담기

            } else {

                TagAllExpenditureResDto existingFirstTagDto = firstTagMap.get(firstTagId);
                // 첫번째 태그가 이미 존재한다면
                // 두 번째 태그가 이미 존재하는지 확인
                boolean isSecondTagExists = false;

                for (TagSecondExpenditureDto secondTagDto : existingFirstTagDto.getTagSecondExpenditureDtoList() ) {
                    if (secondTagDto.getSecondTagId().equals(dto.getSecondTagId())) {
                        isSecondTagExists = true;
                        // 이미 존재하면
                        // 세 번째 태그 추가
                        TagThirdExpenditureDto thirdTagDto = TagThirdExpenditureDto.builder()
                                .thirdTagId(dto.getThirdTagId())
                                .thirdTagName(dto.getThirdTagName())
                                .moneyExpenditureId(dto.getMoneyExpenditureId())
                                .amount(dto.getAmount())
                                .build();

                        secondTagDto.getTagThirdExpenditureDtoList().add(thirdTagDto);
                        break;
                    }
                }

                // 두 번째 태그가 이미 존재하지 않는 경우 생성하여 추가
                if (!isSecondTagExists) {
                    // 두번째 만들기
                    TagSecondExpenditureDto secondTagDto = TagSecondExpenditureDto.builder()
                            .secondTagId(dto.getSecondTagId())
                            .secondTagName(dto.getSecondTagName())
                            .tagThirdExpenditureDtoList(new ArrayList<>())
                            .build();

                    // 세번째 만들기
                    TagThirdExpenditureDto thirdTagDto = TagThirdExpenditureDto.builder()
                            .thirdTagId(dto.getThirdTagId())
                            .thirdTagName(dto.getThirdTagName())
                            .moneyExpenditureId(dto.getMoneyExpenditureId())
                            .amount(dto.getAmount())
                            .build();

                    secondTagDto.getTagThirdExpenditureDtoList().add(thirdTagDto);
                }

            }
        }

        List<TagAllExpenditureResDto> finalResult = new ArrayList<>(firstTagMap.values());

        return finalResult;
    }



}
