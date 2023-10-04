package yeon.dubu.stuff.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.stuff.dto.response.StuffLikesResDto;
import yeon.dubu.stuff.service.StuffLikesService;

import java.util.List;

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

    @GetMapping("/likes")
    public ResponseEntity<?> searchStuffLikes(
            @AuthenticationPrincipal Long userId
    ) {
        List<StuffLikesResDto> stuffLikesResDtos = stuffLikesService.searchStuffLikes(userId);

        return ResponseEntity.ok(stuffLikesResDtos);
    }

    @DeleteMapping("/likes/{likesId}")
    public ResponseEntity<?> deleteStuffLikes(
            @AuthenticationPrincipal Long userId,
            @PathVariable Long likesId
    ) {
        stuffLikesService.deleteStuffLikes(likesId, userId);

        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
