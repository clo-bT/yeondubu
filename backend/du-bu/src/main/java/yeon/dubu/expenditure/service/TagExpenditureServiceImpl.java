package yeon.dubu.expenditure.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.common.create.ThirdTagDict;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.TagSecondExpenditureDto;
import yeon.dubu.expenditure.dto.TagThirdExpenditureDto;
import yeon.dubu.expenditure.dto.query.AllTagsExpenditureQueryDto;
import yeon.dubu.expenditure.dto.response.TagAllExpenditureResDto;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.*;

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
    private final MoneyExpenditureRepository moneyExpenditureRepository;
    private final ThirdTagDict thirdTagDict;


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

                firstTagMap.put(firstTagId, firstTagDto);  // firstTagMap에 담기
            }

            TagAllExpenditureResDto existingFirstTagDto = firstTagMap.get(firstTagId);

            // 두 번째 태그 생성 또는 가져오기
            TagSecondExpenditureDto secondTagDto = null;
            for (TagSecondExpenditureDto tag : existingFirstTagDto.getTagSecondExpenditureDtoList()) {
                if (tag.getSecondTagId().equals(dto.getSecondTagId())) {
                    secondTagDto = tag;
                    break;
                }
            }

            if (secondTagDto == null) {
                // 두번째 만들기
                secondTagDto = TagSecondExpenditureDto.builder()
                        .secondTagId(dto.getSecondTagId())
                        .secondTagName(dto.getSecondTagName())
                        .tagThirdExpenditureDtoList(new ArrayList<>())
                        .build();
                existingFirstTagDto.getTagSecondExpenditureDtoList().add(secondTagDto);
            }

            // 세 번째 태그 생성
            TagThirdExpenditureDto thirdTagDto = TagThirdExpenditureDto.builder()
                    .thirdTagId(dto.getThirdTagId())
                    .thirdTagName(dto.getThirdTagName())
                    .moneyExpenditureId(dto.getMoneyExpenditureId())
                    .amount(dto.getAmount())
                    .userRole(dto.getUserRole())
                    .payComplete(dto.getPayComplete())
                    .build();

            secondTagDto.getTagThirdExpenditureDtoList().add(thirdTagDto);
        }

        List<TagAllExpenditureResDto> finalResult = new ArrayList<>(firstTagMap.values());

        return finalResult;
    }

    @Override
    @Transactional
    public void createFirstTags(Long coupleId) {
        Couple couple = coupleRepository.findById(coupleId).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        List<String> firstTagNames = Arrays.asList("결혼식", "스드메", "신혼 여행", "신혼집", "혼수", "인사", "기타");

        Map<Integer, List<String>> secondTagDict = new HashMap<>();
        secondTagDict.put(0, Arrays.asList("예식장"));
        secondTagDict.put(1, Arrays.asList("부부 스드메 및 스튜디오", "혼주 메이크업", "혼주 한복"));
        secondTagDict.put(2, Arrays.asList("항공권", "숙박", "여행 경비","선물 구입비"));
        secondTagDict.put(3, Arrays.asList("신혼집", "인테리어", "부동산"));
        secondTagDict.put(4, Arrays.asList("가구", "가전", "주방 용품", "침구", "생활용품"));
        secondTagDict.put(5, Arrays.asList("상견례"));
        secondTagDict.put(6, Arrays.asList("기타"));

        // firstTag
        for (int i = 0; i < firstTagNames.size(); i++) {
            String firstTagName = firstTagNames.get(i);
            TagFirstExpenditure tagFirstExpenditure = new TagFirstExpenditure();
            tagFirstExpenditure.setFirstTagName(firstTagName);
            tagFirstExpenditure.setCouple(couple);
            tagFirstExpenditureRepository.save(tagFirstExpenditure);
            // secondTag
            this.createSecondTags(tagFirstExpenditure, i, secondTagDict.get(i), coupleId);

        }
    }

    @Override
    @Transactional
    public void createSecondTags(TagFirstExpenditure tagFirstExpenditure, Integer i, List<String> secondTagNames, Long coupleId) {
        Couple couple = coupleRepository.findById(coupleId).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        for (int j = 0; j < secondTagNames.size(); j++) {
            String secondTagName = secondTagNames.get(j);
            TagSecondExpenditure tagSecondExpenditure = new TagSecondExpenditure();
            tagSecondExpenditure.setSecondTagName(secondTagName);
            tagSecondExpenditure.setTagFirstExpenditure(tagFirstExpenditure);
            tagSecondExpenditureRepository.save(tagSecondExpenditure);

            // thirdTag
            this.createThirdTags(tagSecondExpenditure, i, j, coupleId);
        }


    }

    @Override
    @Transactional
    public void createThirdTags(TagSecondExpenditure tagSecondExpenditure, Integer i, Integer j, Long coupleId) {
        Couple couple = coupleRepository.findById(coupleId).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        List<String> thirdTagNames = new ArrayList<>();
        if (thirdTagDict.getThirdTagDict().containsKey(i)) {
            Map<Integer, List<String>> jMap = thirdTagDict.getThirdTagDict().get(i);
            if (jMap.containsKey(j)) {
                thirdTagNames.addAll(jMap.get(j));
            }
        }

        for (String thirdTagName : thirdTagNames) {
            TagThirdExpenditure tagThirdExpenditure = new TagThirdExpenditure();
            tagThirdExpenditure.setThirdTagName(thirdTagName);
            tagThirdExpenditure.setTagSecondExpenditure(tagSecondExpenditure);

            // money 초기값 설정
            MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                    .tagThirdExpenditure(tagThirdExpenditure)
                    .userRole(UserRole.UNDEFINED)
                    .amount(0L)
                    .memo("")
                    .payComplete(Boolean.FALSE)
                    .build();

            moneyExpenditureRepository.save(moneyExpenditure);
            tagThirdExpenditureRepository.save(tagThirdExpenditure);

        }
    }
}
