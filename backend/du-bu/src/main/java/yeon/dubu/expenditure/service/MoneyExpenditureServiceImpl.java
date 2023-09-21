package yeon.dubu.expenditure.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;


@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MoneyExpenditureServiceImpl implements MoneyExpenditureService{

    private final UserRepository userRepository;
    private final CoupleRepository coupleRepository;
    private final MoneyRepository moneyRepository;
    private final MoneyExpenditureRepository moneyExpenditureRepository;
    private final TagThirdExpenditureRepository tagThirdExpenditureRepository;


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
        TagThirdExpenditure tagThirdExpenditure = tagThirdExpenditureRepository.findById(moneyExpenditureReqDto.getThirdTagId()).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));

        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .tagThirdExpenditure(tagThirdExpenditure)
                .userRole(moneyExpenditureReqDto.getUserRole())
                .date(moneyExpenditureReqDto.getDate())
                .amount(moneyExpenditureReqDto.getAmount())
                .memo(moneyExpenditureReqDto.getMemo())
                .build();

        moneyExpenditureRepository.save(moneyExpenditure);

        return moneyExpenditure;
    }

}
