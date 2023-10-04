package yeon.dubu.stuff.service;

import yeon.dubu.stuff.dto.response.StuffLikesResDto;

import java.util.List;

public interface StuffLikesService {
    void createStuffLikes(String category, String subCategory, Long userId);

    List<StuffLikesResDto> searchStuffLikes (Long userId);
    void deleteStuffLikes(Long stuffId, Long userId);
}
