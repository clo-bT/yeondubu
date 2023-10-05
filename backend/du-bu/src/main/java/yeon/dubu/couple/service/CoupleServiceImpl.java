package yeon.dubu.couple.service;

import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.dto.request.CoupleInfoReqDto;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.repository.TagFirstExpenditureRepository;
import yeon.dubu.expenditure.service.TagFirstExpenditureService;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.income.repository.MoneyIncomeRepository;
import yeon.dubu.income.service.MoneyIncomeService;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService{
    private final CoupleRepository coupleRepository;
    private final UserRepository userRepository;
    private final TagFirstExpenditureRepository tagFirstExpenditureRepository;
    private final TagFirstExpenditureService tagFirstExpenditureService;
    private final MoneyIncomeRepository moneyIncomeRepository;
    private final MoneyIncomeService moneyIncomeService;
    @Override
    @Transactional
    public void insertInfo(Long userId, CoupleInfoReqDto coupleInfoReqDto) {

        Couple couple = getCoupleByUserId(userId);

        couple.setWeddingDate(coupleInfoReqDto.getWeddingDate());

        List<User> users = userRepository.findByCoupleId(couple.getId());
        for (User u:users
        ) {
            if(u.getId().equals(userId))
                u.setUserRole(coupleInfoReqDto.getUserRole());
            else {
                if(coupleInfoReqDto.getUserRole().equals(UserRole.BRIDE))
                    u.setUserRole(UserRole.GROOM);
                else
                    u.setUserRole(UserRole.BRIDE);
            }
            userRepository.save(u);
        }

        coupleRepository.save(couple);
    }

    @Override
    @Transactional
    public void updateInfo(Long userId, LocalDate weddingDate) {
        Couple couple = getCoupleByUserId(userId);

        couple.setWeddingDate(weddingDate);

        coupleRepository.save(couple);
    }

    @Override
    public LocalDate searchInfo(Long userId) {
        Couple couple = getCoupleByUserId(userId);

        return couple.getWeddingDate();
    }

    @Override
    @Transactional
    public void deleteCouple(Long userId) {
        Couple couple = getCoupleByUserId(userId);

        // couple의 지출 태그 전체 삭제
        List<TagFirstExpenditure> firstTagList = tagFirstExpenditureRepository.findByCoupleId(couple.getId());

        for (TagFirstExpenditure tagFirstExpenditure : firstTagList) {
            tagFirstExpenditureService.deleteFirstTag(tagFirstExpenditure.getId(), userId);
        }

        // couple의 income 전체 삭제
        List<MoneyIncome> incomeList = moneyIncomeRepository.findByCoupleId(couple.getId());

        for (MoneyIncome moneyIncome : incomeList) {
            moneyIncomeService.deleteIncome(moneyIncome.getId());
        }

        // user와의 관계 삭제
        User bride = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.BRIDE).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신부가 없습니다."));
        User groom = userRepository.findByCoupleIdAndUserRole(couple.getId(), UserRole.GROOM).orElseThrow(() -> new NoSuchUserException("해당하는 예비 신랑이 없습니다."));

        bride.setCouple(null);
        groom.setCouple(null);

        coupleRepository.deleteById(couple.getId());
    }

    public Couple getCoupleByUserId(Long userId){
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("올바른 사용자가 아닙니다.")
        );

        Long coupleId = user.getCouple().getId();

        Couple couple = coupleRepository.findById(coupleId).orElseThrow(
            () -> new NoSuchCoupleException("해당 커플이 없습니다.")
        );
        return couple;
    }
}
