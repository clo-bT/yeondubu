package yeon.dubu.expenditure.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.expenditure.domain.QMoneyExpenditure;
import yeon.dubu.expenditure.domain.QTagFirstExpenditure;
import yeon.dubu.expenditure.domain.QTagSecondExpenditure;
import yeon.dubu.expenditure.domain.QTagThirdExpenditure;
import yeon.dubu.expenditure.dto.query.ExpenditureListDto;

import java.time.YearMonth;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomMoneyExpenditureRepositoryImpl implements CustomMoneyExpenditureRepository{

    private final JPAQueryFactory queryFactory;
    QCouple qCouple = QCouple.couple;
    QTagFirstExpenditure qTagFirstExpenditure = QTagFirstExpenditure.tagFirstExpenditure;
    QTagSecondExpenditure qTagSecondExpenditure = QTagSecondExpenditure.tagSecondExpenditure;
    QTagThirdExpenditure qTagThirdExpenditure = QTagThirdExpenditure.tagThirdExpenditure;
    QMoneyExpenditure qMoneyExpenditure = QMoneyExpenditure.moneyExpenditure;
    @Override
    public List<ExpenditureListDto> searchYearMonth(YearMonth yearMonth, Long coupleId) {
        List<ExpenditureListDto> yearMonthTags = queryFactory
                .select(Projections.constructor(ExpenditureListDto.class,
                        qMoneyExpenditure.date,
                        qMoneyExpenditure.id,
                        qMoneyExpenditure.userRole,
                        qTagFirstExpenditure.id,
                        qTagSecondExpenditure.id,
                        qTagThirdExpenditure.id,
                        qTagFirstExpenditure.firstTagName,
                        qTagSecondExpenditure.secondTagName,
                        qTagThirdExpenditure.thirdTagName,
                        qMoneyExpenditure.amount,
                        qMoneyExpenditure.memo,
                        qMoneyExpenditure.payComplete
                ))
                .from(qTagFirstExpenditure)
                .join(qTagFirstExpenditure).on(qCouple.id.eq(qTagFirstExpenditure.couple.id))
                .join(qTagSecondExpenditure).on(qTagFirstExpenditure.id.eq(qTagSecondExpenditure.tagFirstExpenditure.id))
                .join(qTagThirdExpenditure).on(qTagSecondExpenditure.id.eq(qTagThirdExpenditure.tagSecondExpenditure.id))
                .join(qMoneyExpenditure).on(qTagThirdExpenditure.id.eq(qMoneyExpenditure.tagThirdExpenditure.id))
                .where(qTagFirstExpenditure.couple.id.eq(coupleId)
                        .and(qMoneyExpenditure.date.between(yearMonth.atDay(1), yearMonth.atEndOfMonth())))
                .fetch();

        return yearMonthTags;
    }

    @Override
    public Tuple searchMinMax(Long coupleId) {
        Tuple minMaxDates = queryFactory
                .select(
                        qMoneyExpenditure.date.min(),
                        qMoneyExpenditure.date.max()
                )
                .from(qTagFirstExpenditure)
                .join(qTagFirstExpenditure).on(qCouple.id.eq(qTagFirstExpenditure.couple.id))
                .join(qTagSecondExpenditure).on(qTagFirstExpenditure.id.eq(qTagSecondExpenditure.tagFirstExpenditure.id))
                .join(qTagThirdExpenditure).on(qTagSecondExpenditure.id.eq(qTagThirdExpenditure.tagSecondExpenditure.id))
                .join(qMoneyExpenditure).on(qTagThirdExpenditure.id.eq(qMoneyExpenditure.tagThirdExpenditure.id))
                .where(qTagFirstExpenditure.couple.id.eq(coupleId))
                .fetchOne();

        return minMaxDates;
    }

}
