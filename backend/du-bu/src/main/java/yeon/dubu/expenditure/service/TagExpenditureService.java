package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;

import java.util.List;

public interface TagExpenditureService {

//    TagFirstExpenditure insertFirstTag(String firstTagName, Long userId);
//    TagSecondExpenditure insertSecondTag(String firstTagName, String secondTagName, Long userId);
//    TagThirdExpenditure insertThirdTag(String firstTagName, String secondTagName, String thirdTagName, Long userId);

    List<AllFirstTagExpenditureResDto> searchAllTags(Long userId);
}
