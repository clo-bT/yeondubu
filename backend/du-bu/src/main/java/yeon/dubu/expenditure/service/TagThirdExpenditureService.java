package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;

public interface TagThirdExpenditureService {
    TagThirdExpenditure insertThirdTag(TagThirdExpenditureReqDto tagThirdExpenditureReqDto, Long userId);

}
