package yeon.dubu.money.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.expenditure.domain.QMoneyExpenditure;
import yeon.dubu.expenditure.domain.QTagFirstExpenditure;
import yeon.dubu.expenditure.domain.QTagSecondExpenditure;
import yeon.dubu.expenditure.domain.QTagThirdExpenditure;

@Slf4j
@RequiredArgsConstructor
public class CustomMoneyRepositoryImpl {
    private final JPAQueryFactory queryFactory;


}
