package yeon.dubu.expenditure.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.expenditure.domain.QMoneyExpenditure;
import yeon.dubu.expenditure.domain.QTagFirstExpenditure;
import yeon.dubu.expenditure.domain.QTagSecondExpenditure;
import yeon.dubu.expenditure.domain.QTagThirdExpenditure;
import yeon.dubu.expenditure.dto.response.AllFirstTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllSecondTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.AllThirdTagExpenditureResDto;
import yeon.dubu.expenditure.dto.response.QAllFirstTagExpenditureResDto;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomTagExpenditureRepositoryImpl implements CustomTagExpenditureRepository{

    private final JPAQueryFactory queryFactory;

    QCouple qCouple = QCouple.couple;
    QTagFirstExpenditure qTagFirstExpenditure = QTagFirstExpenditure.tagFirstExpenditure;
    QTagSecondExpenditure qTagSecondExpenditure = QTagSecondExpenditure.tagSecondExpenditure;
    QTagThirdExpenditure qTagThirdExpenditure = QTagThirdExpenditure.tagThirdExpenditure;
    QMoneyExpenditure qMoneyExpenditure = QMoneyExpenditure.moneyExpenditure;

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
                        qTagFirstExpenditure.id,
                        qTagFirstExpenditure.firstTagName
                ))
                .from(qTagFirstExpenditure)
                .where(qTagFirstExpenditure.couple.id.eq(coupleId))
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
                        qTagSecondExpenditure.id,
                        qTagSecondExpenditure.secondTagName
                ))
                .from(qTagSecondExpenditure)
                .leftJoin(qTagSecondExpenditure.tagFirstExpenditure, qTagFirstExpenditure)
                .where(qTagFirstExpenditure.firstTagName.eq(firstTagName))
                .fetch();

        return searchSecondTagList;
    }

    /**
     * couple의 secondTag의 thirdTag 전체 조회
     * @param coupleId
     * @param secondTagName
     * @return
     */
    @Override
    public List<AllThirdTagExpenditureResDto> searchThirdTagByCouple(Long coupleId, String secondTagName) {

        List<AllThirdTagExpenditureResDto> searchThirdTagList = queryFactory
                .select(Projections.constructor(AllThirdTagExpenditureResDto.class,
                        qTagThirdExpenditure.id,
                        qTagThirdExpenditure.thirdTagName,
                        qMoneyExpenditure.id,
                        qMoneyExpenditure.amount
                ))
                .from(qTagThirdExpenditure)
                .leftJoin(qTagThirdExpenditure.tagSecondExpenditure, qTagSecondExpenditure)
                .leftJoin(qTagSecondExpenditure.tagFirstExpenditure, qTagFirstExpenditure)
                .leftJoin(qMoneyExpenditure.tagThirdExpenditure, qTagThirdExpenditure)
                .where(qTagSecondExpenditure.secondTagName.eq(secondTagName))
                .fetch();

        return searchThirdTagList;
    }

    /**
     * 사용자의 전체 태그 리스트 조회
     * @param coupleId
     * @return
     */
    @Override
    public List<AllFirstTagExpenditureResDto> searhAllTags(Long coupleId) {

        List<AllFirstTagExpenditureResDto> result = queryFactory
                .select(Projections.constructor(AllFirstTagExpenditureResDto.class,
                        qTagFirstExpenditure.id,
                        qTagFirstExpenditure.firstTagName,
                        Projections.list(Projections.constructor(AllSecondTagExpenditureResDto.class,
                                qTagSecondExpenditure.id,
                                qTagSecondExpenditure.secondTagName,
                                Projections.list(Projections.constructor(AllThirdTagExpenditureResDto.class,
                                        qTagThirdExpenditure.id,
                                        qTagThirdExpenditure.thirdTagName,
                                        qMoneyExpenditure.id,
                                        qMoneyExpenditure.amount
                                ))
                        ))

                ))
                .from(qCouple)
                .leftJoin(qTagFirstExpenditure.couple, qCouple)
                .leftJoin(qTagSecondExpenditure.tagFirstExpenditure, qTagFirstExpenditure)
                .leftJoin(qTagThirdExpenditure.tagSecondExpenditure, qTagSecondExpenditure)
                .leftJoin(qMoneyExpenditure.tagThirdExpenditure, qTagThirdExpenditure)
                .where(qCouple.id.eq(coupleId))
                .fetch();

        return result;
    }

}
