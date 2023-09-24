package yeon.dubu.expenditure.service;

import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.expenditure.dto.UpdateExpenditureInfoDto;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureUpdateReqDto;
import yeon.dubu.expenditure.dto.response.MoneyExpenditureDetailResDto;

public interface MoneyExpenditureService {
    MoneyExpenditure insertExpenditure(MoneyExpenditureReqDto moneyExpenditureReqDto, Long userId);
    void updateUserExpenditure(UpdateExpenditureInfoDto updateInfo); // 지출 수정시
    void updateExpenditure(MoneyExpenditureUpdateReqDto moneyExpenditureUpdateReqDto, Long userId);
    MoneyExpenditureDetailResDto searchExpenditure(Long thirdTagId, Long userId);
    void deleteExpenditure(Long expenditureId, Long userId);
}
