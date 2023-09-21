package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagFirstExpenditure;

public interface TagFirstExpenditureService {
    TagFirstExpenditure insertFirstTag(String firstTagName, Long userId);

}
