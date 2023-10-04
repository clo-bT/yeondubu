package yeon.dubu.stuff.service;

import yeon.dubu.stuff.domain.StuffLikes;
import yeon.dubu.stuff.dto.request.StuffLikesReqDto;

public interface StuffLikesService {
    void createStuffLikes(String category, String subCategory, Long userId);
}
