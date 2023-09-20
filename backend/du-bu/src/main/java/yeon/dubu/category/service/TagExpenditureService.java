package yeon.dubu.category.service;

import yeon.dubu.category.domain.TagExpenditure;

public interface TagExpenditureService {

    TagExpenditure saveFirstTag(String firstTagName, Long userId);
    TagExpenditure saveSecondTag(String firstTagName, String secondTagName, Long userId);
    TagExpenditure saveThirdTag(String firstTagName, String secondTagName, String thirdTagName, Long userId);

}
