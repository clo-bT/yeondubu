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


        CoupleConnection coupleConnection = findConnection(userId, "");
        //entity 없으면 생성 후 waiting return
        if(coupleConnection == null){
            coupleConnection = new CoupleConnection();
            coupleConnection.setHost(user);
            coupleConnection.setCode(code);
            coupleConnectionRepository.save(coupleConnection);
        }
        else { //entity 있으면
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

        deleteConnection(userId);
    }

    @Override
    @Transactional
    public Long enterCoupleConnection(Long userId, Integer code) {
        //TODO:
        // userId가 hostId인 coupleConnection 지우기
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

    @Override
    @Transactional
    public String checkPartner(Long userId, String role, Boolean isRepeat) {
        CoupleConnection coupleConnection = findConnection(userId, role);
        //null일땐 지워줘야함
        //iscancelled 일 땐 db삭제
        if(coupleConnection.getIsCancelled()){
            deleteConnection(userId);
            return "cancelled";
        }

        if(getCheck(coupleConnection, role)){
            if(isRepeat) deleteConnection(userId);
            else setCheck(coupleConnection, role);
            return "finish";
        }
        else{
            setCheck(coupleConnection, role);
            return "waiting";
        }

    }


    private CoupleConnection findConnection(Long userId, String role){
        Optional<CoupleConnection> opCoupleConnection = null;

        if (role.equals("guest")) {
            opCoupleConnection = coupleConnectionRepository.findByGuestId(userId);
        }
        else
            opCoupleConnection = coupleConnectionRepository.findByHostId(userId);
        System.out.println("opCoupleConnection.toString() = " + opCoupleConnection.toString());
        if(opCoupleConnection.isEmpty())
            return null;
        else
            return opCoupleConnection.get();


    }
    private void deleteConnection(Long userId){
            coupleConnectionRepository.deleteByGuestId(userId);
            coupleConnectionRepository.deleteByHostId(userId);
    }

    private Boolean getCheck(CoupleConnection coupleConnection, String role){
        //상대방을 체크하는거라 반대로
        if(role.equals("host"))
            return coupleConnection.getGuestCheck();
        else
            return coupleConnection.getHostCheck();
    }
    @Transactional
    public void setCheck(CoupleConnection coupleConnection, String role){

        if(role.equals("host"))
            coupleConnection.setHostCheck(Boolean.TRUE);
        else {
            coupleConnection.setGuestCheck(Boolean.TRUE);
        }
        coupleConnectionRepository.save(coupleConnection);
    }

}
