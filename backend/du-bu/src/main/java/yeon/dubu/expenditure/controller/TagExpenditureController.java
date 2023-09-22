package yeon.dubu.expenditure.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;
import yeon.dubu.expenditure.dto.request.TagSecondExpenditureReqDto;
import yeon.dubu.expenditure.dto.request.TagThirdExpenditureReqDto;
import yeon.dubu.expenditure.service.TagExpenditureService;
import yeon.dubu.expenditure.service.TagFirstExpenditureService;
import yeon.dubu.expenditure.service.TagSecondExpenditureService;
import yeon.dubu.expenditure.service.TagThirdExpenditureService;

import java.net.URISyntaxException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
public class TagExpenditureController {

    private final TagExpenditureService tagExpenditureService;
    private final TagFirstExpenditureService tagFirstExpenditureService;
    private final TagSecondExpenditureService tagSecondExpenditureService;
    private final TagThirdExpenditureService tagThirdExpenditureService;

    @PostMapping("/{firstTagName}")
    public ResponseEntity insertFirstTag(
            @AuthenticationPrincipal Long userId,
            @PathVariable String firstTagName
    ) throws URISyntaxException {
        TagFirstExpenditure savedFirstTag = tagFirstExpenditureService.insertFirstTag(firstTagName, userId);

        return ResponseEntity.ok(savedFirstTag);
    }

    @PostMapping("/{firstTagName}/{secondTagName}")
    public ResponseEntity insertSecondTag(
            @AuthenticationPrincipal Long userId,
            @RequestBody TagSecondExpenditureReqDto tagSecondExpenditureReqDto
            ) throws URISyntaxException {

        TagSecondExpenditure savedSecondTag = tagSecondExpenditureService.insertSecondTag(tagSecondExpenditureReqDto, userId);

        return ResponseEntity.ok(savedSecondTag);
    }

    @PostMapping("/{firstTagName}/{secondTagName}/{thirdTagName}")
    public ResponseEntity insertSecondTag(
            @AuthenticationPrincipal Long userId,
            @RequestBody TagThirdExpenditureReqDto tagThirdExpenditureReqDto
            ) throws URISyntaxException {
        TagThirdExpenditure savedThirdTag = tagThirdExpenditureService.insertThirdTag(tagThirdExpenditureReqDto, userId);

        return ResponseEntity.ok(savedThirdTag);
    }

}
