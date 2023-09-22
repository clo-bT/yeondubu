package yeon.dubu.expenditure.repository;

import yeon.dubu.expenditure.dto.query.AllTagsExpenditureQueryDto;

import java.util.List;

public interface CustomTagExpenditureRepository {
    List<AllTagsExpenditureQueryDto> searchAllTag(Long coupleId);
}
