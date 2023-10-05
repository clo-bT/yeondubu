package yeon.dubu.income.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.income.domain.TagIncome;
import yeon.dubu.income.dto.response.TagIncomeResDto;
import yeon.dubu.income.service.TagIncomeService;

@Slf4j
@RestController
@RequestMapping("/api/v1/income/tag")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://j9a307.p.ssafy.io:3000", "https://j9a307.p.ssafy.io"})
public class TagIncomeController {
    private final TagIncomeService tagIncomeService;

    @GetMapping
    public ResponseEntity<?> searchTag(){
        List<TagIncomeResDto> tagIncomeResDtoList = tagIncomeService.searchTag();
        return new ResponseEntity<>(tagIncomeResDtoList, HttpStatus.OK);
    }
}
