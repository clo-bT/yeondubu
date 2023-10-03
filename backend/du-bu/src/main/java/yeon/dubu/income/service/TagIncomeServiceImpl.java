package yeon.dubu.income.service;

import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import yeon.dubu.income.domain.TagIncome;
import yeon.dubu.income.dto.response.TagIncomeResDto;
import yeon.dubu.income.repository.TagIncomeRepository;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TagIncomeServiceImpl implements TagIncomeService{
    private final TagIncomeRepository tagIncomeRepository;

    @Override
    public List<TagIncomeResDto> searchTag() {
        List<TagIncome> tagIncomeList = tagIncomeRepository.findAll();
        List<TagIncomeResDto> tagIncomeResDtoList = new ArrayList<>();
        for(TagIncome tagIncome : tagIncomeList){
            tagIncomeResDtoList.add(TagIncomeResDto.from(tagIncome));
        }
        return tagIncomeResDtoList;
    }
}
