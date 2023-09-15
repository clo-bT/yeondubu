package yeon.dubu.user.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.user.domain.User;
import yeon.dubu.user.dto.response.UserInfoResponseDto;
import yeon.dubu.user.exception.NoSuchUserException;
import yeon.dubu.user.repository.UserRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Transactional
    @Override
    public UserInfoResponseDto retrieveMember(Long userId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchUserException("해당하는 회원은 존재하지 않습니다."));

        UserInfoResponseDto userInfoResponse = UserInfoResponseDto.builder()
                .id(userId)
                .email(user.getEmail())
                .imgUrl(user.getImageUrl())
                .build();

        return userInfoResponse;
    }
}
