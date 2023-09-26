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
import yeon.dubu.expenditure.dto.UpdateExpenditureInfoDto;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureUpdateReqDto;
import yeon.dubu.expenditure.dto.response.MoneyExpenditureDetailResDto;
import yeon.dubu.expenditure.exception.NoSuchExpenditureException;
import yeon.dubu.expenditure.repository.MoneyExpenditureRepository;
import yeon.dubu.expenditure.exception.NoSuchTagExpenditureException;
import yeon.dubu.expenditure.repository.TagThirdExpenditureRepository;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.exception.NoSuchMoneyException;
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
        MoneyExpenditure updateMoney = moneyExpenditureRepository.findByTagThirdExpenditure(tagThirdExpenditure).orElseThrow(() -> new NoSuchExpenditureException("해당하는 지출 정보가 없습니다."));

        // thirdTag 등록 후 생성된 moneyExpenditure row 초기 업데이트
        MoneyExpenditure moneyExpenditure = MoneyExpenditure.builder()
                .userRole(moneyExpenditureReqDto.getUserRole())
                .date(moneyExpenditureReqDto.getDate())
                .amount(moneyExpenditureReqDto.getAmount())
                .memo(moneyExpenditureReqDto.getMemo())
                .payComplete(moneyExpenditureReqDto.getPayComplete())
                .build();

        // TODO: update MoneyExpenditure에서 set 구현
        updateMoney.setUserRole(moneyExpenditureReqDto.getUserRole());
        updateMoney.setDate(moneyExpenditureReqDto.getDate());
        updateMoney.setAmount(moneyExpenditureReqDto.getAmount());
        updateMoney.setMemo(moneyExpenditure.getMemo());
        updateMoney.setPayComplete(moneyExpenditure.getPayComplete());
//        updateMoney.initalUpdate(moneyExpenditure);


        // 사용자의 자산 정보 업데이트
        User expendUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), moneyExpenditureReqDto.getUserRole()).orElse(null);

        if (expendUser != null) {
            Money expendMoney = moneyRepository.findByUserId(expendUser.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));
            expendMoney.setExpectExpenditure(expendMoney.getExpectExpenditure() + moneyExpenditureReqDto.getAmount());
            if (moneyExpenditureReqDto.getPayComplete()) {
                expendMoney.setCompleteExpenditure(expendMoney.getCompleteExpenditure() + moneyExpenditureReqDto.getAmount());
            }
        }

        return null;
    }

    /**
     * 사용자의 지출 정보 수정
     * @param updateInfo
     */
    @Override
    @Transactional
    public void updateUserExpenditure(UpdateExpenditureInfoDto updateInfo) {
        User afterUser = userRepository.findById(updateInfo.getAfterUserId()).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        User beforeUser = userRepository.findById(updateInfo.getBeforeUserId()).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Money afterMoney = moneyRepository.findByUserId(afterUser.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));
        Money beforeMoney = moneyRepository.findByUserId(beforeUser.getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        Long changeMoney = updateInfo.getAfterAmount() - updateInfo.getBeforeAmount();
        // TODO: 리팩토링 -> Money 엔티티에 update 메서드 구현

        // role 수정
        if (updateInfo.getRoleChanged()) {
            // payComplete 수정
            if (updateInfo.getPayChanged()) {
                 // true
                if (updateInfo.getPayComplete()) {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() - updateInfo.getBeforeAmount());
                    afterMoney.setExpectExpenditure(afterMoney.getExpectExpenditure() + updateInfo.getAfterAmount());
                    afterMoney.setCompleteExpenditure(afterMoney.getCompleteExpenditure() + updateInfo.getAfterAmount());
                } else {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() - updateInfo.getBeforeAmount());
                    beforeMoney.setCompleteExpenditure(beforeMoney.getCompleteExpenditure() - updateInfo.getBeforeAmount());
                    afterMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + updateInfo.getAfterAmount());
                }
            } else {
                // true
                if (updateInfo.getPayComplete()) {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() - updateInfo.getBeforeAmount());
                    afterMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + updateInfo.getAfterAmount());
                } else {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() - updateInfo.getBeforeAmount());
                    beforeMoney.setCompleteExpenditure(beforeMoney.getCompleteExpenditure() - updateInfo.getBeforeAmount());
                    afterMoney.setExpectExpenditure(afterMoney.getExpectExpenditure() + updateInfo.getAfterAmount());
                    afterMoney.setCompleteExpenditure(afterMoney.getCompleteExpenditure() + updateInfo.getAfterAmount());
                }
            }
        } else {
            // payComplete 수정
            if (updateInfo.getPayChanged()) {
                // true
                if (updateInfo.getPayComplete()) {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + changeMoney);
                    beforeMoney.setCompleteExpenditure(beforeMoney.getCompleteExpenditure() + updateInfo.getAfterAmount());
                } else {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + changeMoney);
                    beforeMoney.setCompleteExpenditure(beforeMoney.getCompleteExpenditure() - updateInfo.getAfterAmount());
                }
            } else {
                // true
                if (updateInfo.getPayComplete()) {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + changeMoney);
                    beforeMoney.setCompleteExpenditure(beforeMoney.getCompleteExpenditure() + changeMoney);
                } else {
                    beforeMoney.setExpectExpenditure(beforeMoney.getExpectExpenditure() + changeMoney);
                }
            }
        }
    }

    /**
     * 지출 정보 수정
     * @param moneyExpenditureUpdateReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public void updateExpenditure(MoneyExpenditureUpdateReqDto moneyExpenditureUpdateReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        MoneyExpenditure moneyExpenditure = moneyExpenditureRepository.findById(moneyExpenditureUpdateReqDto.getExpenditureId()).orElseThrow(() -> new NoSuchExpenditureException("해당하는 지출 정보가 없습니다."));

        boolean payCompleteChanged = !moneyExpenditure.getPayComplete().equals(moneyExpenditureUpdateReqDto.getPayComplete());  // payComplete 변경 여부
        boolean roleChanged = !moneyExpenditure.getUserRole().equals(moneyExpenditureUpdateReqDto.getUserRole()); // 역할 수정 여부
        Optional<User> afterUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), moneyExpenditureUpdateReqDto.getUserRole());
        Optional<User> beforeUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), moneyExpenditure.getUserRole());

        UpdateExpenditureInfoDto updateInfo = UpdateExpenditureInfoDto.builder()
                .beforeAmount(moneyExpenditure.getAmount())
                .afterAmount(moneyExpenditureUpdateReqDto.getAmount())
                .payComplete(moneyExpenditureUpdateReqDto.getPayComplete())
                .payChanged(payCompleteChanged)
                .roleChanged(roleChanged)
                .afterUserId(afterUser.get().getId())
                .beforeUserId(beforeUser.get().getId())
                .build();

        updateUserExpenditure(updateInfo);
        moneyExpenditureUpdateReqDto.update(moneyExpenditure);
    }

    @Override
    @Transactional
    public MoneyExpenditureDetailResDto searchExpenditure(Long thirdTagId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        TagThirdExpenditure tagThirdExpenditure = tagThirdExpenditureRepository.findById(thirdTagId).orElseThrow(() -> new NoSuchTagExpenditureException("해당하는 태그 정보가 없습니다."));
        MoneyExpenditure moneyExpenditure = moneyExpenditureRepository.findByTagThirdExpenditure(tagThirdExpenditure).orElseThrow(() -> new NoSuchExpenditureException("해당하는 지출 정보가 없습니다."));

        MoneyExpenditureDetailResDto moneyExpenditureDetailResDto = MoneyExpenditureDetailResDto.builder()
                .expenditureId(moneyExpenditure.getId())
                .userRole(moneyExpenditure.getUserRole())
                .date(moneyExpenditure.getDate())
                .amount(moneyExpenditure.getAmount())
                .memo(moneyExpenditure.getMemo() != null ? moneyExpenditure.getMemo() : "")
                .payComplete(moneyExpenditure.getPayComplete())
                .build();

        return moneyExpenditureDetailResDto;
    }

    @Override
    public void deleteExpenditure(Long expenditureId, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Couple couple = coupleRepository.findById(user.getCouple().getId()).orElseThrow(() -> new NoSuchCoupleException("해당하는 커플 정보가 없습니다."));
        MoneyExpenditure moneyExpenditure = moneyExpenditureRepository.findById(expenditureId).orElseThrow(() -> new NoSuchExpenditureException("해당하는 지출 정보가 없습니다."));
        Optional<User> expendUser = userRepository.findByCoupleIdAndUserRole(couple.getId(), moneyExpenditure.getUserRole());
        Money expendMoney = moneyRepository.findByUserId(expendUser.get().getId()).orElseThrow(() -> new NoSuchMoneyException("해당하는 사용자의 자산 정보가 없습니다."));

        expendMoney.updateExpenditureByDelete(moneyExpenditure.getAmount(), moneyExpenditure.getPayComplete());  // 자산 정보 업데이트
        moneyExpenditureRepository.deleteById(expenditureId);

    }




}
