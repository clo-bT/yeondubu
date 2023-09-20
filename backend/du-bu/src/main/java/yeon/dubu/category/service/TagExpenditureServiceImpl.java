package yeon.dubu.category.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.repository.TagExpenditureRepository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class TagExpenditureServiceImpl implements TagExpenditureService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final TagExpenditureRepository tagExpenditureRepository;

    @Override
    @Transactional
    public TagExpenditure saveFirstTag(String firstTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));


        TagExpenditure tagExpenditure = TagExpenditure.builder()
                .couple(couple)
                .firstTagName(firstTagName)
                .build();

        tagExpenditureRepository.save(tagExpenditure);

        return tagExpenditure;
    }

    @Override
    @Transactional
    public TagExpenditure saveSecondTag(String firstTagName, String secondTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));


        // 이미 입력된 first tag 찾기 ?
        TagExpenditure tagExpenditure = TagExpenditure.builder()
                .couple(couple)
                .firstTagName(firstTagName)
                .secondTagName(secondTagName)
                .build();

        tagExpenditureRepository.save(tagExpenditure);

        return tagExpenditure;
    }

    @Override
    @Transactional
    public TagExpenditure saveThirdTag(String firstTagName, String secondTagName, String thirdTagName, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));


        // 이미 존재하는 first tag, second tag 찾기?? -> update...?
        TagExpenditure tagExpenditure = TagExpenditure.builder()
                .couple(couple)
                .firstTagName(firstTagName)
                .secondTagName(secondTagName)
                .thirdTagName(thirdTagName)
                .build();

        return null;
    }

}
