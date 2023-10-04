package yeon.dubu.stuff.repository;

import yeon.dubu.stuff.dto.response.StuffLikesResDto;

import java.util.List;

public interface CustomStuffLikesRepository {
    List<StuffLikesResDto> searchLikes(Long coupleId);
}
