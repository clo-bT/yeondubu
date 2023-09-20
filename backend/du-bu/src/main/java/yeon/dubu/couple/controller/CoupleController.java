package yeon.dubu.couple.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
@RequestMapping("/api/v1/couple")
@RequiredArgsConstructor
public class CoupleController {
    private final CoupleService coupleService;

    @PostMapping("/info")
    public ResponseEntity<?> insertInfo(@AuthenticationPrincipal Long userId,
        @RequestBody CoupleInfoReqDto coupleInfoReqDto){
        coupleService.insertInfo(coupleInfoReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PatchMapping("/info")
    public ResponseEntity<?> updateInfo(@AuthenticationPrincipal Long userId,
        @RequestBody CoupleInfoReqDto coupleInfoReqDto){
        coupleService.insertInfo(coupleInfoReqDto);
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<?> searchInfo(@AuthenticationPrincipal Long userId){
        return new ResponseEntity<>("", HttpStatus.OK);
    }
}
