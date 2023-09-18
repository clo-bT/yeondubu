package yeon.dubu.couple.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.couple.dto.response.CoupleCreatePartnerRes;
import yeon.dubu.couple.service.CoupleCreateService;

@Slf4j
@RestController
@RequestMapping("/api/v1/couple")
@RequiredArgsConstructor
public class CoupleController {
    private final CoupleCreateService coupleCreateService;
    @PostMapping("/code/{code}")
    public ResponseEntity<?> createCode(@AuthenticationPrincipal Long userId, @PathVariable Integer code){
        Long guestId = coupleCreateService.createCoupleConnection(userId, code);
        CoupleCreatePartnerRes coupleCreatePartnerRes = new CoupleCreatePartnerRes();

        if(guestId != -1L) { //guest가 있으면
            coupleCreatePartnerRes.setState("finish");
            coupleCreatePartnerRes.setPartnerId(guestId);
        }
        else
            coupleCreatePartnerRes.setState("waiting");
        return new ResponseEntity<CoupleCreatePartnerRes>(coupleCreatePartnerRes, HttpStatus.OK);
    }

    @DeleteMapping("/code")
    public ResponseEntity<?> deleteCode(@AuthenticationPrincipal Long userId){
        coupleCreateService.deleteCoupleConnection(userId);
        return new ResponseEntity<String>("success  ", HttpStatus.OK);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<?> enterCode(@AuthenticationPrincipal Long userId, @PathVariable Integer code){
        Long hostId = coupleCreateService.enterCoupleConnection(userId, code);
        CoupleCreatePartnerRes coupleCreatePartnerRes = new CoupleCreatePartnerRes();

        if(hostId != -1L) { //guest가 있으면
            coupleCreatePartnerRes.setState("success");
            coupleCreatePartnerRes.setPartnerId(hostId);
        }
        else
            coupleCreatePartnerRes.setState("fail");
        return new ResponseEntity<CoupleCreatePartnerRes>(coupleCreatePartnerRes, HttpStatus.OK);

    }

}
