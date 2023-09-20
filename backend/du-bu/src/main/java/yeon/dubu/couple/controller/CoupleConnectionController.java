package yeon.dubu.couple.controller;
import static java.lang.Boolean.FALSE;
import static java.lang.Boolean.TRUE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.couple.dto.response.CoupleCreatePartnerResDto;
import yeon.dubu.couple.service.CoupleConnectionService;

@Slf4j
@RestController
@RequestMapping("/api/v1/couple")
@RequiredArgsConstructor
public class CoupleConnectionController {
    private final CoupleConnectionService coupleConnectionService;
    @PostMapping("/code/{code}")
    public ResponseEntity<?> createCode(@AuthenticationPrincipal Long userId, @PathVariable Integer code){
        Long guestId = coupleConnectionService.createCoupleConnection(userId, code);
        CoupleCreatePartnerResDto coupleCreatePartnerResDto = new CoupleCreatePartnerResDto();

        if(guestId != -1L) { //guest가 있으면
            coupleCreatePartnerResDto.setState("finish");
            coupleCreatePartnerResDto.setPartnerId(guestId);
        }
        else
            coupleCreatePartnerResDto.setState("waiting");
        return new ResponseEntity<CoupleCreatePartnerResDto>(coupleCreatePartnerResDto, HttpStatus.OK);
    }

    @DeleteMapping("/code")
    public ResponseEntity<?> deleteCode(@AuthenticationPrincipal Long userId){
        coupleConnectionService.deleteCoupleConnection(userId);
        return new ResponseEntity<String>("success  ", HttpStatus.OK);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<?> enterCode(@AuthenticationPrincipal Long userId, @PathVariable Integer code){
        Long hostId = coupleConnectionService.enterCoupleConnection(userId, code);
        CoupleCreatePartnerResDto coupleCreatePartnerResDto = new CoupleCreatePartnerResDto();

        if(hostId != -1L) { //guest가 있으면
            coupleCreatePartnerResDto.setState("success");
            coupleCreatePartnerResDto.setPartnerId(hostId);
        }
        else
            coupleCreatePartnerResDto.setState("fail");
        return new ResponseEntity<CoupleCreatePartnerResDto>(coupleCreatePartnerResDto, HttpStatus.OK);

    }

    @GetMapping("/check1/{role}")
    public ResponseEntity<?> checkPartner1(@AuthenticationPrincipal Long userId, @PathVariable String role){
        String state = coupleConnectionService.checkPartner(userId, role, FALSE);
        return new ResponseEntity<String>(state, HttpStatus.OK);
    }

    @GetMapping("/check2/{role}")
    public ResponseEntity<?> checkPartner2(@AuthenticationPrincipal Long userId, @PathVariable String role){
        String state = coupleConnectionService.checkPartner(userId, role, TRUE);
        return new ResponseEntity<String>(state, HttpStatus.OK);
    }

    @DeleteMapping("/check")
    public ResponseEntity<?> rejectCheck(@AuthenticationPrincipal Long userId){
        coupleConnectionService.rejectCheck(userId);
        return new ResponseEntity<String>("success", HttpStatus.OK);

    }

}
