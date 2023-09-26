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
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureUpdateDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagSecondExpenditureServiceImpl implements TagSecondExpenditureService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;
    private final TagSecondExpenditureRepository tagSecondExpenditureRepository;
    private final TagThirdExpenditureService tagThirdExpenditureService;

    /**
     * secondTag 등록
     * @param tagSecondExpenditureReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TagSecondExpenditure insertSecondTag(TagSecondExpenditureReqDto tagSecondExpenditureReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagFirstExpenditure tagFirstExpenditure = tagFirstExpenditureRepository.findById(tagSecondExpenditureReqDto.getFirstTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 첫번째 태그 정보가 없습니다."));

        TagSecondExpenditure tagSecondExpenditure = TagSecondExpenditure.builder()
                .tagFirstExpenditure(tagFirstExpenditure)
                .secondTagName(tagSecondExpenditureReqDto.getSecondTagName())
                .build();

        TagSecondExpenditure savedSecondTag = tagSecondExpenditureRepository.save(tagSecondExpenditure);

        TagThirdExpenditureReqDto tagThirdExpenditureReqDto = TagThirdExpenditureReqDto.builder()
                .secondTagId(savedSecondTag.getId())
                .thirdTagName("기타")
                .build();

        tagThirdExpenditureService.insertThirdTag(tagThirdExpenditureReqDto, userId);

        return savedSecondTag;
    }

    @Override
    @Transactional
    public void updateSecondTag(TagSecondExpenditureUpdateDto tagSecondExpenditureUpdateDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagSecondExpenditure tagSecondExpenditure = tagSecondExpenditureRepository.findById(tagSecondExpenditureUpdateDto.getSecondTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));
        tagSecondExpenditure.setSecondTagName(tagSecondExpenditureUpdateDto.getSecondTagName());
    }

}
