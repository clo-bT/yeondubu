package yeon.dubu.couple.service;

import yeon.dubu.user.domain.User;

public interface CoupleConnectionService {
    User createCoupleConnection(Long userId, Integer code);
    void deleteCoupleConnection(Long userId);
    User enterCoupleConnection(Long userId, Integer code);
    String checkPartner(Long userId, String role, Boolean isRepeat);
    void rejectCheck(Long userId);
}
