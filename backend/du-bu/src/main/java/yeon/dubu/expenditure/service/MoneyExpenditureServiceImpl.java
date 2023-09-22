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
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.exception.NoSuchUserRoleException;
import yeon.dubu.user.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;


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

        // userRole에서 사용자 찾기
        User expendUser = userRepository.findByCoupleIdAndAndUserRole(couple.getId(), moneyExpenditureReqDto.getUserRole()).orElseThrow(() -> new NoSuchUserRoleException("해당하는 역할의 사용자가 없습니다."));
        Money money = moneyRepository.findByUser(expendUser).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        // couple의 역할에서 사용자의 money 등록
        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .tagThirdExpenditure(tagThirdExpenditure)
                .userRole(moneyExpenditureReqDto.getUserRole())
                .date(moneyExpenditureReqDto.getDate())
                .amount(moneyExpenditureReqDto.getAmount())
                .memo(moneyExpenditureReqDto.getMemo())
                .build();

        moneyExpenditureRepository.save(moneyExpenditure);

        // 사용자의 자산 정보 등록
        LocalDate currentDate = LocalDate.now();
        if (moneyExpenditure.getDate().isBefore(currentDate) || moneyExpenditure.getDate().isEqual(currentDate)) {

            // 과거
            Long presentExpenditure = money.getPresentExpenditure();
            Long presentTotal = presentExpenditure + moneyExpenditure.getAmount();
            money.setPresentExpenditure(presentTotal);

        } else {
            // 미래
            Long futureExpenditure = money.getFutureExpenditure();
            Long futureTotal = futureExpenditure + moneyExpenditure.getAmount();
            money.setFutureExpenditure(futureTotal);
        }

        return moneyExpenditure;
    }

}
