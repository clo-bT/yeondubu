package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;

public interface TagSecondExpenditureService {
    TagSecondExpenditure insertSecondTag(TagSecondExpenditureReqDto tagSecondExpenditureReqDto, Long userId);

}
