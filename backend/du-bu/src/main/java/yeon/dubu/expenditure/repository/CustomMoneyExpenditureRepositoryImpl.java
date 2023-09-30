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
import yeon.dubu.expenditure.dto.query.ExpenditureGraphDto;
import yeon.dubu.expenditure.dto.query.ExpenditureListDto;

import java.time.YearMonth;
import java.util.ArrayList;
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

    @Override
    public List<ExpenditureGraphDto> searchGraph(Long coupleId) {
        List<ExpenditureGraphDto> graphs = new ArrayList<>();

        List<Tuple> queryResults = queryFactory
                .select(
                        qMoneyExpenditure.date.yearMonth(),
                        qMoneyExpenditure.amount.sum()
                )
                .from(qTagFirstExpenditure)
                .join(qTagFirstExpenditure).on(qCouple.id.eq(qTagFirstExpenditure.couple.id))
                .join(qTagSecondExpenditure).on(qTagFirstExpenditure.id.eq(qTagSecondExpenditure.tagFirstExpenditure.id))
                .join(qTagThirdExpenditure).on(qTagSecondExpenditure.id.eq(qTagThirdExpenditure.tagSecondExpenditure.id))
                .join(qMoneyExpenditure).on(qTagThirdExpenditure.id.eq(qMoneyExpenditure.tagThirdExpenditure.id))
                .where(qTagFirstExpenditure.couple.id.eq(coupleId))
                .groupBy(qMoneyExpenditure.date.yearMonth())
                .fetch();
        System.out.println("queryResults.toString() = " + queryResults.toString());



        for (Tuple tuple : queryResults) {
            String yearMonthString = String.valueOf(tuple.get(0, Integer.class));

            if (yearMonthString.length() != 6 || yearMonthString == null) {
                continue;
            }
            // YearMonth로 변환
            Integer year = Integer.parseInt(yearMonthString.substring(0, 4));
            Integer month = Integer.parseInt(yearMonthString.substring(4));

            YearMonth yearMonth = YearMonth.of(year, month);

            // 리스트에 추가
            Long expenditureSum = tuple.get(1, Long.class);
            ExpenditureGraphDto expenditureGraphDto = new ExpenditureGraphDto(yearMonth, expenditureSum);
            graphs.add(expenditureGraphDto);
        }

        return graphs;
    }

}
