package yeon.dubu.user.service;

import yeon.dubu.user.dto.response.UserResDto;

public interface UserService {

    UserResDto retrieveMember(Long userId);

}
