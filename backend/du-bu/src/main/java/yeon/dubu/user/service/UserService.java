package yeon.dubu.user.service;

import yeon.dubu.user.dto.response.UserSignUpResponseDto;

public interface UserService {

    UserSignUpResponseDto retrieveMember(Long userId);

}
