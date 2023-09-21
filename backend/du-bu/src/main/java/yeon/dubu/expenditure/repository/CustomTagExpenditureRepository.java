package yeon.dubu.expenditure.repository;

import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllSecondTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllThirdTagExpenditureResDto;

import java.util.List;

public interface CustomTagExpenditureRepository {
    List<AllFirstTagExpenditureResDto> searchFirstTagByCouple(Long coupleId);  // couple의 firstTag 전체 조회
    List<AllSecondTagExpenditureResDto> searchSecondTagByCouple(Long coupleId, String firstTagName);

    List<AllThirdTagExpenditureResDto> searchThirdTagByCouple(Long coupleId, String firstTagName, String secondTagName, String thirdTagName);

}
