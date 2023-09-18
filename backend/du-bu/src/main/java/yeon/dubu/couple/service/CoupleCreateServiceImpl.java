package yeon.dubu.couple.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.CoupleConnection;
import yeon.dubu.couple.exception.NoSuceCoupleConnectionException;
import yeon.dubu.couple.repository.CoupleConnectionRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleCreateServiceImpl implements CoupleCreateService{

    private final CoupleConnectionRepository coupleConnectionRepository;
    private final UserRepository userRepository;
    @Override
    @Transactional
    public Long createCoupleConnection(Long userId, Integer code) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException()
        );

        Optional<CoupleConnection> opCoupleConnection = coupleConnectionRepository.findByHostId(userId);

        //entity 없으면 생성 후 waiting return
        if(opCoupleConnection.isEmpty()){
            CoupleConnection coupleConnection = new CoupleConnection();
            coupleConnection.setHost(user);
            coupleConnection.setCode(code);
            coupleConnectionRepository.save(coupleConnection);
        }
        else {
            //entity 있으면
            CoupleConnection coupleConnection = opCoupleConnection.get();

            //코드 일치 확인 후 없으면 변경
            if (!code.equals(coupleConnection.getCode())){
                coupleConnection.setCode(code);
                coupleConnectionRepository.save(coupleConnection);
            }
            else{
                User guest = coupleConnection.getGuest();
                //guestId가 있으면 성공
                if (guest != null) {
                    return guest.getId();
                }
            }
        }

        return -1L;
    }

    @Override
    @Transactional
    public void deleteCoupleConnection(Long userId){
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException()
        );
        coupleConnectionRepository.deleteById(userId);
    }

    @Override
    @Transactional
    public Long enterCoupleConnection(Long userId, Integer code) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("해당하는 사용자가 없습니다.")
        );

        CoupleConnection coupleConnection = coupleConnectionRepository.findByCode(code).orElseThrow(
            () -> new NoSuceCoupleConnectionException("일치하지 않는 코드입니다.")
        );

        if(coupleConnection.getGuest() == null){
            coupleConnection.setGuest(user);
            coupleConnectionRepository.save(coupleConnection);
            return coupleConnection.getHost().getId();
        }

        return -1L;

    }
}
