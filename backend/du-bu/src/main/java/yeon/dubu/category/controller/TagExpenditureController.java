package yeon.dubu.category.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.category.domain.TagExpenditure;
import yeon.dubu.category.service.TagExpenditureService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
public class TagExpenditureController {

    private final TagExpenditureService tagExpenditureService;

    @PostMapping("/{firstTagName}")
    public ResponseEntity saveFirstTag(
            @AuthenticationPrincipal Long userId,
            @PathVariable String firstTagName
    ) {
        TagExpenditure savedFirstTag = tagExpenditureService.saveFirstTag(firstTagName, userId);

        return ResponseEntity.ok(savedFirstTag);
    }

//    @PostMapping("/{firstTagName}/{secondTagName}")
//    public ResponseEntity saveSecondTag(
//            @AuthenticationPrincipal Long userId,
//            @PathVariable String secondTagName
//    ) {
//
//    }


}
