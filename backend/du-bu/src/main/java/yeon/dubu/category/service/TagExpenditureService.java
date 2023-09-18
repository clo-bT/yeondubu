package yeon.dubu.category.service;

import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.dto.request.TagExpenditureReqDto;

public interface TagExpenditureService {
    TagExpenditure insert(TagExpenditureReqDto tagExpenditureReqDto, Long userId);
}
