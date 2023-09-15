package yeon.dubu.user.service;

import yeon.dubu.user.dto.response.UserResponseDto;

public interface UserService {

    UserResponseDto retrieveMember(Long userId);

}
