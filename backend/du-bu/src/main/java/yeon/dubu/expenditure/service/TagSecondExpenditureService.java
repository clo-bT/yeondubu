package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureUpdateDto;

public interface TagSecondExpenditureService {
    TagSecondExpenditure insertSecondTag(TagSecondExpenditureReqDto tagSecondExpenditureReqDto, Long userId);
    void updateSecondTag(TagSecondExpenditureUpdateDto tagSecondExpenditureUpdateDto, Long userId);
    void deleteSecondTag(Long secondTagId, Long userId);
}
