package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureUpdateDto;

public interface TagThirdExpenditureService {
    TagThirdExpenditure insertThirdTag(TagThirdExpenditureReqDto tagThirdExpenditureReqDto, Long userId);
    void updateThirdTag(TagThirdExpenditureUpdateDto tagThirdExpenditureUpdateDto, Long userId);


}
