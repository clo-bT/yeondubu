package yeon.dubu.income.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.income.domain.TagIncome;
import yeon.dubu.income.dto.response.TagIncomeResDto;
import yeon.dubu.income.service.TagIncomeService;

@Slf4j
@RestController
@RequestMapping("/api/v1/income/tag")
@RequiredArgsConstructor
public class TagIncomeController {
    private final TagIncomeService tagIncomeService;

    @GetMapping
    public ResponseEntity<?> searchTag(){
        List<TagIncomeResDto> tagIncomeResDtoList = tagIncomeService.searchTag();
        return new ResponseEntity<>(tagIncomeResDtoList, HttpStatus.OK);
    }
}
