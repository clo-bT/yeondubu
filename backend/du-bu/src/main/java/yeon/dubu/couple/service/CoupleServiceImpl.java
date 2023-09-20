package yeon.dubu.couple.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.dto.request.CoupleInfoReqDto;
import yeon.dubu.couple.repository.CoupleRepository;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CoupleServiceImpl implements CoupleService{
    private CoupleRepository coupleRepository;
    private UserRepository userRepository;
    @Override
    public void insertInfo(CoupleInfoReqDto coupleInfoReqDto) {

        //userRepository.findByCoupleId()
        //coupleRepository.save();
        //userRepository.save();
    }
}
