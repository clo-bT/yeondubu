package yeon.dubu.income.service;

import java.util.List;
import yeon.dubu.income.dto.response.TagIncomeResDto;

public interface TagIncomeService {
    List<TagIncomeResDto> searchTag();
}
