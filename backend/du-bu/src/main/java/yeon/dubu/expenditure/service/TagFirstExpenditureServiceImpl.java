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
import yeon.dubu.expenditure.dto.request.TagFirstExpenditureUpdateDto;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.List;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagFirstExpenditureServiceImpl implements TagFirstExpenditureService{
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;
    private final TagSecondExpenditureRepository tagSecondExpenditureRepository;
    private final TagSecondExpenditureService tagSecondExpenditureService;
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

        TagFirstExpenditure savedFristTag = tagFirstExpenditureRepository.save(tagFirstExpenditure);

        TagSecondExpenditureReqDto tagSecondExpenditureReqDto = TagSecondExpenditureReqDto.builder()
                .firstTagId(savedFristTag.getId())
                .secondTagName("기타")
                .build();

        tagSecondExpenditureService.insertSecondTag(tagSecondExpenditureReqDto, userId);

        return savedFristTag;
    }

    @Override
    @Transactional
    public void updateFirstTag(TagFirstExpenditureUpdateDto tagFirstExpenditureUpdateDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagFirstExpenditure tagFirstExpenditure = tagFirstExpenditureRepository.findById(tagFirstExpenditureUpdateDto.getFirstTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));
        tagFirstExpenditure.setFirstTagName(tagFirstExpenditureUpdateDto.getFirstTagName());
    }

    @Override
    @Transactional
    public void deleteFirstTag(Long firstTagId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        TagFirstExpenditure tagFirstExpenditure = tagFirstExpenditureRepository.findById(firstTagId).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 첫번째 태그 정보가 없습니다."));

        List<TagSecondExpenditure> secondTagList = tagSecondExpenditureRepository.findByTagFirstExpenditureId(firstTagId);

        // 모든 secondTag 지우기
        for (TagSecondExpenditure tagSecondExpenditure : secondTagList) {
            tagSecondExpenditureService.deleteSecondTag(tagSecondExpenditure.getId(), userId);
        }

        tagFirstExpenditureRepository.deleteById(firstTagId);

    }

}
