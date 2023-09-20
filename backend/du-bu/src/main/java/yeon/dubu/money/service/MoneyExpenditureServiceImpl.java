package yeon.dubu.money.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.repository.TagExpenditureRepository;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.money.domain.MoneyExpenditure;
import yeon.dubu.money.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.money.exception.NoSuchTagExpenditureException;
import yeon.dubu.money.repository.MoneyExpenditureRepository;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

import java.util.Optional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MoneyExpenditureServiceImpl implements MoneyExpenditureService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final MoneyRepository moneyRepository;
    private final MoneyExpenditureRepository moneyExpenditureRepository;
    private final TagExpenditureRepository tagExpenditureRepository;


    /**
     * 사용자의 couple의 tag에 따른 지출 등록
     * @param moneyExpenditureReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public MoneyExpenditure insertExpenditure(MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));

        Optional<TagExpenditure> searchTags = tagExpenditureRepository.findTagExpenditureByCoupleAndFirstTagNameAndSecondTagNameAndThirdTagName(couple, moneyExpenditureReqDto.getFirstTagName(), moneyExpenditureReqDto.getSecondTagName(), moneyExpenditureReqDto.getThirdTagName());

        if (!searchTags.isPresent()) {
            throw new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다.");
        }

        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .userRole(moneyExpenditureReqDto.getUserRole())
                .date(moneyExpenditureReqDto.getDate())
                .amount(moneyExpenditureReqDto.getAmount())
                .memo(moneyExpenditureReqDto.getMemo())
                .tagExpenditure(searchTags.get())
                .build();

        moneyExpenditureRepository.save(moneyExpenditure);

        return moneyExpenditure;
    }
}
