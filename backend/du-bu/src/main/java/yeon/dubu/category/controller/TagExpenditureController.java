package yeon.dubu.category.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.user.dto.response.UserResDto;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
public class TagExpenditureController {

    @PostMapping("/{firstTagName}")
    public ResponseEntity saveFirstTag(
            @AuthenticationPrincipal Long userId,
            @PathVariable String firstTagName
    ) {

    }


//    @GetMapping
//    public ResponseEntity getId(@AuthenticationPrincipal Long userId) {
//        log.debug("retrieve() userId: {}", userId);
//        UserResDto userResDto = userService.retrieveMember(userId);
//
//        return ResponseEntity.ok(userResDto);
//    }

}