package yeon.dubu.couple.service;

import java.time.LocalDate;
import yeon.dubu.couple.dto.request.CoupleInfoReqDto;

public interface CoupleService {
    void insertInfo(Long userId, CoupleInfoReqDto coupleInfoReqDto);
    void updateInfo(Long userId, LocalDate weddingDate);
    LocalDate searchInfo(Long userId);
    void deleteCouple(Long userId);
}
