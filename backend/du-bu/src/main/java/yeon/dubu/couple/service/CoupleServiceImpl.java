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
import yeon.dubu.user.domain.User;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService{
    private CoupleRepository coupleRepository;
    private UserRepository userRepository;
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
    public void deleteCouple(Long userId) {
        Couple couple = getCoupleByUserId(userId);
        coupleRepository.delete(couple);
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
