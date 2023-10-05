package yeon.dubu.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import yeon.dubu.user.dto.response.UserResDto;
import yeon.dubu.user.service.UserService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = {"http://localhost:3000", "https://localhost:3000", "https://j9a307.p.ssafy.io:3000", "https://j9a307.p.ssafy.io"})
public class UserController {

    private final UserService userService;

    /**
     * 사용자 정보 조회
     * @param userId
     * @return
     */
    @GetMapping
    public ResponseEntity<?> getId(@AuthenticationPrincipal Long userId) {
        log.debug("retrieve() userId: {}", userId);
        UserResDto userResDto = userService.retrieveMember(userId);

        return ResponseEntity.ok(userResDto);
    }

    @DeleteMapping
    private ResponseEntity<?> delete(
            @AuthenticationPrincipal Long userId
    ) {
        userService.deleteUser(userId);

        return ResponseEntity.ok().build();
    }

}
