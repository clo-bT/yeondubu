package yeon.dubu.couple.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.couple.domain.CoupleConnection;
import yeon.dubu.couple.exception.NoSuchCoupleConnectionException;
import yeon.dubu.couple.exception.NoSuchCoupleException;
import yeon.dubu.couple.repository.CoupleConnectionRepository;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.expenditure.service.TagExpenditureService;
import yeon.dubu.income.service.TagIncomeService;
import yeon.dubu.money.domain.Money;
import yeon.dubu.money.repository.MoneyRepository;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleConnectionServiceImpl implements CoupleConnectionService {

    private final CoupleConnectionRepository coupleConnectionRepository;
    private final CoupleRepository coupleRepository;
    private final UserRepository userRepository;
    private final MoneyRepository moneyRepository;
    private final TagExpenditureService tagExpenditureService;
    private final TagIncomeService tagIncomeService;

    @Override
    @Transactional
    public User createCoupleConnection(Long userId, Integer code) {
        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("해당하는 사용자가 없습니다.")
        );

        CoupleConnection coupleConnection = findConnection(userId, "host");
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
                coupleConnectionRepository.deleteByHostId(userId);
                coupleConnection = new CoupleConnection();
                coupleConnection.setHost(user);
                coupleConnection.setCode(code);
                coupleConnectionRepository.save(coupleConnection);
            }
            else{
                User guest = coupleConnection.getGuest();
                //guestId가 있으면 성공
                if (guest != null) {
                    return guest;
                }
            }
        }

        return null;
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
    public User enterCoupleConnection(Long userId, Integer code) {
        // userId가 hostId인 coupleConnection 지우기
        coupleConnectionRepository.deleteByHostId(userId);

        User user = userRepository.findById(userId).orElseThrow(
            () -> new NoSuchUserException("해당하는 사용자가 없습니다.")
        );

        CoupleConnection coupleConnection = coupleConnectionRepository.findByCode(code).orElseThrow(
            () -> new NoSuchCoupleConnectionException("일치하지 않는 코드입니다.")
        );

        if(coupleConnection.getGuest() == null){
            coupleConnection.setGuest(user);
            coupleConnectionRepository.save(coupleConnection);
            return coupleConnection.getHost();
        }

        return null;

    }

    @Override
    @Transactional
    public String checkPartner(Long userId, String role, Boolean isRepeat) {
        CoupleConnection coupleConnection = findConnection(userId, role);
        if (coupleConnection == null){
            return "cancelled";
        }
        //iscancelled 일 땐 db삭제
        if(coupleConnection.getIsCancelled()){
            deleteConnection(userId);
            return "cancelled";
        }

        if(getCheck(coupleConnection, role)){
            if(isRepeat) {
                //커플 생성 및 user에게 coupleId없애주기
                createCoupleColumn(coupleConnection);

                //money row 생성
                createMoney(coupleConnection);

                //couple connection 삭제
                deleteConnection(userId);
            }
            else setCheck(coupleConnection, role);
            return "finish";
        }
        else{
            setCheck(coupleConnection, role);
            return "waiting";
        }
    }

    @Override
    @Transactional
    public void rejectCheck(Long userId){
        CoupleConnection coupleConnection = findConnection(userId, "");
        if (coupleConnection != null) {
            coupleConnection.setIsCancelled(Boolean.TRUE);
            coupleConnectionRepository.save(coupleConnection);
        }
    }


    private CoupleConnection findConnection(Long userId, String role){
        Optional<CoupleConnection> opCoupleConnection = null;

        if (role.equals("guest")) {
            opCoupleConnection = coupleConnectionRepository.findByGuestId(userId);
            opCoupleConnection.orElseThrow(
                () -> new NoSuchCoupleConnectionException("해당하는 사용자가 없습니다.")
            );
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

    @Transactional
    public void createCoupleColumn(CoupleConnection coupleConnection){
        Long hostId = coupleConnection.getHost().getId();
        Long guestId = coupleConnection.getGuest().getId();

        Long coupleId = coupleRepository.save(new Couple()).getId();
        Couple couple = coupleRepository.findById(coupleId).orElseThrow(
            () -> new NoSuchCoupleException("해당하는 커플이 없습니다.")
        );
        User host = userRepository.findById(hostId).orElseThrow(
            () -> new NoSuchUserException("해당하는 사용자가 없습니다.")
        );
        User guest = userRepository.findById(guestId).orElseThrow(
            () -> new NoSuchUserException("해당하는 사용자가 없습니다.")
        );

        host.setCouple(couple);
        guest.setCouple(couple);

        // couple의 expenditureTags 생성
        tagExpenditureService.createFirstTags(coupleId);
    }

    @Transactional
    public void createMoney(CoupleConnection coupleConnection){
        User host = coupleConnection.getHost();
        User guest = coupleConnection.getGuest();
        List<User> users = new ArrayList<>();
        users.add(host);
        users.add(guest);
        for(User user : users){
            Optional<Money> existMoney = moneyRepository.findByUserId(user.getId());

            if (existMoney.isEmpty()) {
                // 사용자의 money가 없는 경우에만 생성
                Money money = new Money();
                money.setUser(user);
                moneyRepository.save(money);
            }
        }
    }

}
