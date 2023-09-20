package yeon.dubu.money.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.dto.request.MoneyCashReqDto;
import yeon.dubu.money.exception.NoSuchMoneyException;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class MoneyServiceImpl implements MoneyService{

    private final UserRepository userRepository;
    private final MoneyRepository moneyRepository;

    /**
     * 사용자의 현금 등록
     * @param moneyCashReqDto
     * @param userId
     * @return
     */
    @Override
    @Transactional
    public Money insertCash(MoneyCashReqDto moneyCashReqDto, Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원 정보가 없습니다."));
        Money money = moneyRepository.findByUser(user).orElseThrow(() -> new NoSuchMoneyException("사용자의 자산 정보가 없습니다."));

        money.setTotalCash(moneyCashReqDto.getTotalCash());
        moneyRepository.save(money);

        return money;
    }
}
