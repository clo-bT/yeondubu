package yeon.dubu.oauth.service;

import yeon.dubu.oauth.dto.response.UserInfoResponseDto;

public interface UserInfoService {

    UserInfoResponseDto retrieveMember(Long userId);

}
