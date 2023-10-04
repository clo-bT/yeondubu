package yeon.dubu.stuff.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import yeon.dubu.couple.domain.QCouple;
import yeon.dubu.stuff.domain.QStuff;
import yeon.dubu.stuff.domain.QStuffLikes;
import yeon.dubu.stuff.dto.response.StuffLikesResDto;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class CustomStuffLikesRepositoryImpl implements CustomStuffLikesRepository {

    private final JPAQueryFactory queryFactory;

    QCouple qCouple = QCouple.couple;
    QStuff qStuff = QStuff.stuff;
    QStuffLikes qStuffLikes = QStuffLikes.stuffLikes;

    @Override
    public List<StuffLikesResDto> searchLikes(Long coupleId) {
        List<StuffLikesResDto> stuffLikesList = queryFactory
                .select(Projections.constructor(StuffLikesResDto.class,
                        qStuff.id,
                        qStuff.category,
                        qStuff.subCategory
                ))
                .from(qStuff)
                .join(qStuffLikes).on(qCouple.id.eq(qStuffLikes.couple.id))
                .join(qStuffLikes).on(qStuff.id.eq(qStuffLikes.stuff.id))
                .where(qStuffLikes.couple.id.eq(coupleId))
                .fetch();

        return stuffLikesList;
    }
}
