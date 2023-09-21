package yeon.dubu.income.service;

import java.util.List;
import yeon.dubu.income.dto.response.TagIncomeResDto;

public interface TagIncomeService {
    void insertTag(String tagName);
    List<TagIncomeResDto> searchTag();
}
