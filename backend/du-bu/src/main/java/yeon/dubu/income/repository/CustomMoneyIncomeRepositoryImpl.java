package yeon.dubu.income.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.income.domain.QMoneyIncome;
import yeon.dubu.income.domain.QTagIncome;
import yeon.dubu.income.dto.query.IncomeGraphDto;
import yeon.dubu.income.dto.query.IncomeListDto;
import yeon.dubu.money.domain.QMoney;

import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomMoneyIncomeRepositoryImpl implements CustomMoneyIncomeRepository {
    private final JPAQueryFactory queryFactory;

    QCouple qCouple = QCouple.couple;
    QMoneyIncome qMoneyIncome = QMoneyIncome.moneyIncome;
    QMoney qMoney = QMoney.money;
    QTagIncome qTagIncome = QTagIncome.tagIncome;

    @Override
    public List<IncomeListDto> searchYearMonth(YearMonth yearMonth, Long coupleId) {
        List<IncomeListDto> yearMonthTags = queryFactory
                .select(Projections.constructor(IncomeListDto.class,
                        qMoneyIncome.date,
                        qMoneyIncome.id,
                        qTagIncome.id,
                        qTagIncome.tagName,
                        qMoneyIncome.amount,
                        qMoneyIncome.memo
                        ))
                .from(qMoneyIncome)
                .join(qMoneyIncome).on(qCouple.id.eq(qMoneyIncome.couple.id))
                .join(qMoneyIncome).on(qTagIncome.id.eq(qMoneyIncome.tagIncome.id))
                .where(qMoneyIncome.couple.id.eq(coupleId)
                        .and(qMoneyIncome.date.between(yearMonth.atDay(1), yearMonth.atEndOfMonth())))
                .fetch();

        return yearMonthTags;
    }

    @Override
    public Tuple searchMinMax(Long coupleId) {
        Tuple minMaxDates = queryFactory
                .select(
                        qMoneyIncome.date.min(),
                        qMoneyIncome.date.max()
                )
                .from(qMoneyIncome)
                .join(qMoneyIncome).on(qCouple.id.eq(qMoneyIncome.couple.id))
                .join(qTagIncome).on(qMoneyIncome.tagIncome.id.eq(qTagIncome.id))
                .where(qMoneyIncome.couple.id.eq(coupleId))
                .fetchOne();

        return minMaxDates;
    }

    @Override
    public List<IncomeGraphDto> searchGraph(Long coupleId) {
        List<IncomeGraphDto> graphs = new ArrayList<>();

        List<Tuple> queryResults = queryFactory
                .select(
                        qMoneyIncome.date.yearMonth(),
                        qMoneyIncome.amount.sum()
                )
                .from(qMoneyIncome)
                .join(qMoneyIncome).on(qCouple.id.eq(qMoneyIncome.couple.id))
                .join(qMoneyIncome).on(qTagIncome.id.eq(qMoneyIncome.tagIncome.id))
                .where(qMoneyIncome.couple.id.eq(coupleId))
                .groupBy(qMoneyIncome.date.yearMonth())
                .fetch();

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
                Long incomeSum = tuple.get(1, Long.class);
                IncomeGraphDto incomeGraphDto = new IncomeGraphDto(yearMonth, incomeSum);
                graphs.add(incomeGraphDto);

        }

        return graphs;
    }
}
