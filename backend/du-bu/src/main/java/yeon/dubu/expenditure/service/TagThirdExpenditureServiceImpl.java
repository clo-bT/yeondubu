package yeon.dubu.expenditure.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureUpdateDto;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.repository.TagSecondExpenditureRepository;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagThirdExpenditureServiceImpl implements TagThirdExpenditureService{
    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;
    private final TagSecondExpenditureRepository tagSecondExpenditureRepository;
    private final TagThirdExpenditureRepository tagThirdExpenditureRepository;
    private final MoneyExpenditureService moneyExpenditureService;
    private final MoneyExpenditureRepository moneyExpenditureRepository;
    /**
     * thirdTag 등록
     * @param tagThirdExpenditureReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public TagThirdExpenditure insertThirdTag(TagThirdExpenditureReqDto tagThirdExpenditureReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagSecondExpenditure tagSecondExpenditure = tagSecondExpenditureRepository.findById(tagThirdExpenditureReqDto.getSecondTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 두번째 태그 정보가 없습니다."));

        TagThirdExpenditure tagThirdExpenditure = TagThirdExpenditure.builder()
                .tagSecondExpenditure(tagSecondExpenditure)
                .thirdTagName(tagThirdExpenditureReqDto.getThirdTagName())
                .build();

        TagThirdExpenditure savedThirdTag = tagThirdExpenditureRepository.save(tagThirdExpenditure);

        // thirdTag 등록 후 moneyExpenditure row 생성
        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .tagThirdExpenditure(savedThirdTag)
                .userRole(UserRole.UNDEFINED)
                .amount(0L)
                .memo("")
                .payComplete(Boolean.FALSE)
                .build();

        moneyExpenditureRepository.save(moneyExpenditure);


        return savedThirdTag;
    }

    @Override
    @Transactional
    public void updateThirdTag(TagThirdExpenditureUpdateDto tagThirdExpenditureUpdateDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagThirdExpenditure tagThirdExpenditure = tagThirdExpenditureRepository.findById(tagThirdExpenditureUpdateDto.getThirdTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));
        tagThirdExpenditure.setThirdTagName(tagThirdExpenditureUpdateDto.getThirdTagName());
    }
}
