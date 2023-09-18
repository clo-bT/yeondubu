package yeon.dubu.couple.service;

public interface CoupleCreateService {
    Long createCoupleConnection(Long userId, Integer code);
    void deleteCoupleConnection(Long userId);
    Long enterCoupleConnection(Long userId, Integer code);
}
