package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.dto.response.TagAllExpenditureResDto;

import java.util.List;

public interface TagExpenditureService {
    List<TagAllExpenditureResDto> searchAllTags(Long userId);  // 태그 전체 조회

}
