package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagExpenditure;

public interface TagExpenditureService {

    TagExpenditure insertFirstTag(String firstTagName, Long userId);
    TagExpenditure insertSecondTag(String firstTagName, String secondTagName, Long userId);
    TagExpenditure insertThirdTag(String firstTagName, String secondTagName, String thirdTagName, Long userId);

}
