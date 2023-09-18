package yeon.dubu.couple.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.couple.dto.response.CoupleCodeCreateRes;
import yeon.dubu.couple.service.CoupleCreateService;

@Slf4j
@RestController
@RequestMapping("/api/v1/couple")
@RequiredArgsConstructor
public class CoupleController {
    private static CoupleCreateService coupleCreateService;
    @PostMapping("/code/{code}")
    public ResponseEntity<?> createCode(@AuthenticationPrincipal Long userId, @PathVariable Integer code){
        Long guestId = coupleCreateService.createCoupleConnection(userId, code);
        CoupleCodeCreateRes coupleCodeCreateRes = new CoupleCodeCreateRes();

        if(guestId != -1) { //guest가 있으면
            coupleCodeCreateRes.setState("finish");
            coupleCodeCreateRes.setGuestId(guestId);
        }
        else
            coupleCodeCreateRes.setState("waiting");
        return new ResponseEntity<CoupleCodeCreateRes>(coupleCodeCreateRes, HttpStatus.OK);
    }
}
