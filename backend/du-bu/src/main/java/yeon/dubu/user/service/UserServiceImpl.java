package yeon.dubu.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.dto.response.UserResDto;
import yeon.dubu.user.enumeration.UserRole;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserResDto retrieveMember(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원은 존재하지 않습니다."));

        UserResDto userResDto = UserResDto.builder()
                .id(userId)
                .name(user.getName())
                .imageUrl(user.getImageUrl())
                .userRole(user.getUserRole() != null ? user.getUserRole() : UserRole.UNDEFINED)
                .creditScore(user.getCreditScore() != null ? user.getCreditScore() : -1)
                .isCouple(user.getCouple() != null ? Boolean.TRUE : Boolean.FALSE )
                .build();

        return userResDto;
    }

    @Override
    public void deleteUser(Long userId) {
        // TODO: 사용자 탈퇴 시 couple에 대한 정보 여부 정하기
        userRepository.deleteById(userId);
    }
}
