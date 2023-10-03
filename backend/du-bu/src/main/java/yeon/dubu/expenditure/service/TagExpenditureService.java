package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.dto.response.TagAllExpenditureResDto;

import java.util.List;

public interface TagExpenditureService {
    List<TagAllExpenditureResDto> searchAllTags(Long userId);  // 태그 전체 조회
    void createFirstTags(Long coupleId);
    void createSecondTags(TagFirstExpenditure tagFirstExpenditure, Integer i, List<String> secondTagNames, Long coupleId);
    void createThirdTags(TagSecondExpenditure tagSecondExpenditure, Integer i, Integer j, Long coupleId);
}
