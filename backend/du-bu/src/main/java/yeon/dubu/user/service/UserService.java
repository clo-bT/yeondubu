package yeon.dubu.user.service;

import yeon.dubu.user.dto.response.UserInfoResponseDto;

public interface UserService {

    UserInfoResponseDto retrieveMember(Long userId);

}
