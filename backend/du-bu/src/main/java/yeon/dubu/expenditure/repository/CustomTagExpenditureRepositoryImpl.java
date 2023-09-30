package yeon.dubu.expenditure.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.expenditure.domain.QMoneyExpenditure;
import yeon.dubu.expenditure.domain.QTagFirstExpenditure;
import yeon.dubu.expenditure.domain.QTagSecondExpenditure;
import yeon.dubu.expenditure.domain.QTagThirdExpenditure;
import yeon.dubu.expenditure.dto.query.AllTagsExpenditureQueryDto;

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

    @Override
    public List<AllTagsExpenditureQueryDto> searchAllTag(Long coupleId) {
        List<AllTagsExpenditureQueryDto> allTags = queryFactory
                .select(Projections.constructor(AllTagsExpenditureQueryDto.class,
                        qTagFirstExpenditure.id,
                        qTagFirstExpenditure.firstTagName,
                        qTagSecondExpenditure.id,
                        qTagSecondExpenditure.secondTagName,
                        qTagThirdExpenditure.id,
                        qTagThirdExpenditure.thirdTagName,
                        qMoneyExpenditure.id,
                        qMoneyExpenditure.amount,
                        qMoneyExpenditure.payComplete
                ))
                .from(qTagFirstExpenditure)
                .join(qTagFirstExpenditure).on(qCouple.id.eq(qTagFirstExpenditure.couple.id))
                .join(qTagSecondExpenditure).on(qTagFirstExpenditure.id.eq(qTagSecondExpenditure.tagFirstExpenditure.id))
                .join(qTagThirdExpenditure).on(qTagSecondExpenditure.id.eq(qTagThirdExpenditure.tagSecondExpenditure.id))
                .join(qMoneyExpenditure).on(qTagThirdExpenditure.id.eq(qMoneyExpenditure.tagThirdExpenditure.id))
                .where(qTagFirstExpenditure.couple.id.eq(coupleId))
                .fetch();

        return allTags;
    }



}
