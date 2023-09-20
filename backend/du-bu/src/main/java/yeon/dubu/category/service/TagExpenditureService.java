package yeon.dubu.category.service;

import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.dto.request.TagExpenditureReqDto;

public interface TagExpenditureService {

    TagExpenditure saveFirstTag(String firstTagName, Long userId);
    TagExpenditure save(TagExpenditureReqDto tagExpenditureReqDto, Long userId);
}
