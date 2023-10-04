package yeon.dubu.stuff.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.stuff.service.StuffLikesService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/expenditure/marriage-stuffs")
public class StuffLikesController {
    private final StuffLikesService stuffLikesService;


    @PostMapping("/{category}/{subCategory}")
    public ResponseEntity<?> createStuffLikes(
            @AuthenticationPrincipal Long userId,
            @PathVariable String category,
            @PathVariable String subCategory
    ) {
        stuffLikesService.createStuffLikes(category, subCategory, userId);

        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
