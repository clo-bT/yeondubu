package yeon.dubu.oauth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.oauth.dto.response.UserInfoResponseDto;
import yeon.dubu.oauth.service.UserInfoService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserInfoService userInfoService;

    /**
     * 사용자 정보 조회
     * @param userId
     * @return
     */
    @GetMapping
    public ResponseEntity getId(@AuthenticationPrincipal Long userId) {
        log.debug("retrieve() userId: {}", userId);
        UserInfoResponseDto userInfoResponseDto = userInfoService.retrieveMember(userId);

        return ResponseEntity.ok(userInfoResponseDto);
    }


}
