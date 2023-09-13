package yeon.dubu.oauth.service;

import yeon.dubu.oauth.dto.request.SignInDto;
import yeon.dubu.oauth.dto.response.SignInResponseDto;

public interface AuthUserService {
    SignInResponseDto signIn(SignInDto signInDto) throws Exception;

}
