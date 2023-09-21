package yeon.dubu.expenditure.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.expenditure.domain.QMoneyExpenditure;
import yeon.dubu.expenditure.domain.QTagFirstExpenditure;
import yeon.dubu.expenditure.domain.QTagSecondExpenditure;
import yeon.dubu.expenditure.domain.QTagThirdExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllSecondTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllThirdTagExpenditureResDto;

import java.util.List;

import static yeon.dubu.expenditure.domain.QMoneyExpenditure.*;
import static yeon.dubu.expenditure.domain.QTagFirstExpenditure.*;
import static yeon.dubu.expenditure.domain.QTagSecondExpenditure.*;
import static yeon.dubu.expenditure.domain.QTagThirdExpenditure.*;

@Slf4j
@RequiredArgsConstructor
public class CustomTagExpenditureRepositoryImpl implements CustomTagExpenditureRepository{

    private final JPAQueryFactory queryFactory;

    QTagFirstExpenditure qTagFirstExpenditure = tagFirstExpenditure;
    QTagSecondExpenditure qTagSecondExpenditure = tagSecondExpenditure;
    QTagThirdExpenditure qTagThirdExpenditure = tagThirdExpenditure;
    QMoneyExpenditure qMoneyExpenditure = moneyExpenditure;

    /**
     * couple의 firstTag 전체 조회
     * @param coupleId
     * @return
     */
    @Override
    @Transactional
    public List<AllFirstTagExpenditureResDto> searchFirstTagByCouple(Long coupleId) {

        List<AllFirstTagExpenditureResDto> searchFirstTagList = queryFactory
                .selectDistinct(Projections.constructor(AllFirstTagExpenditureResDto.class,
                        tagFirstExpenditure.firstTagName))
                .from(tagFirstExpenditure)
                .where(tagFirstExpenditure.couple.id.eq(coupleId))
                .fetch();

        return searchFirstTagList;
    }

    /**
     * couple의 firstTag의 secondTag 전체 조회
     * @param coupleId
     * @param firstTagName
     * @return
     */
    @Override
    @Transactional
    public List<AllSecondTagExpenditureResDto> searchSecondTagByCouple(Long coupleId, String firstTagName) {

        List<AllSecondTagExpenditureResDto> searchSecondTagList = queryFactory
                .selectDistinct(Projections.constructor(AllSecondTagExpenditureResDto.class,
                        tagSecondExpenditure.secondTagName))
                .from(tagSecondExpenditure)
                .leftJoin(tagSecondExpenditure.tagFirstExpenditure, tagFirstExpenditure)
                .where(tagFirstExpenditure.firstTagName.eq(firstTagName))
                .fetch();

        return searchSecondTagList;
    }

    /**
     * couple의 secondTag의
     * @param coupleId
     * @param firstTagName
     * @param secondTagName
     * @param thirdTagName
     * @return
     */
    @Override
    public List<AllThirdTagExpenditureResDto> searchThirdTagByCouple(Long coupleId, String firstTagName, String secondTagName, String thirdTagName) {

        List<AllThirdTagExpenditureResDto> searchThirdTagList = queryFactory
                .select(Projections.constructor(AllThirdTagExpenditureResDto.class,
                        tagThirdExpenditure.thirdTagName))
                .from(tagThirdExpenditure)
                .leftJoin(tagThirdExpenditure.tagSecondExpenditure, tagSecondExpenditure)
//                .leftJoin(tagSecondExpenditure.tagFirstExpenditure, tag)
                .where()
                .fetch();

        return null;
    }
}
