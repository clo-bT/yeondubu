package yeon.dubu.oauth.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import yeon.dubu.oauth.dto.request.SignInDto;
import yeon.dubu.oauth.dto.response.SignInResponseDto;
import yeon.dubu.oauth.dto.response.UserResponseDto;
import yeon.dubu.oauth.jwt.JwtTokenProvider;
import yeon.dubu.oauth.repository.UserRepository;
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthUserServiceImpl implements AuthUserService{

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @Override
    public SignInResponseDto signIn(SignInDto signInDto) throws Exception {
        return null;
    }



}
