package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.dto.request.TagFirstExpenditureUpdateDto;

public interface TagFirstExpenditureService {
    TagFirstExpenditure insertFirstTag(String firstTagName, Long userId);
    TagFirstExpenditure updateFirstTag(TagFirstExpenditureUpdateDto tagFirstExpenditureUpdateDto, Long userId);

}
