package yeon.dubu.couple.controller;


import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.couple.dto.request.CoupleInfoReqDto;
import yeon.dubu.couple.service.CoupleService;

@Slf4j
@RestController
@RequestMapping("/api/v1/couples")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://localhost:3000", "https://j9a307.p.ssafy.io:3000", "https://j9a307.p.ssafy.io"})
public class CoupleController {
    private final CoupleService coupleService;

    @PostMapping("/info")
    public ResponseEntity<?> insertInfo(@AuthenticationPrincipal Long userId,
        @RequestBody CoupleInfoReqDto coupleInfoReqDto){
        coupleService.insertInfo(userId, coupleInfoReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PatchMapping("/info")
    public ResponseEntity<?> updateInfo(@AuthenticationPrincipal Long userId,
        @RequestBody LocalDate weddingDate){
        coupleService.updateInfo(userId, weddingDate);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> searchInfo(@AuthenticationPrincipal Long userId){
        LocalDate weddingDate = coupleService.searchInfo(userId);
        return new ResponseEntity<LocalDate>(weddingDate, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteCouple(@AuthenticationPrincipal Long userId){
        coupleService.deleteCouple(userId);
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
