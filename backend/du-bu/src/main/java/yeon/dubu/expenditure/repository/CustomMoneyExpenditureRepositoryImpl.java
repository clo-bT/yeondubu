package yeon.dubu.expenditure.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CustomMoneyExpenditureRepositoryImpl implements CustomMoneyExpenditureRepository{

    private final JPAQueryFactory queryFactory;



}
