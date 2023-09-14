package yeon.dubu.oauth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import yeon.dubu.oauth.oauth2.UserPrincipal;
import yeon.dubu.oauth.repository.UserRepository;
import yeon.dubu.oauth.service.CustomOAuth2UserService;
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class UserController {

    private final UserRepository userRepository;
    private final CustomOAuth2UserService customOAuth2UserService;

//    @GetMapping("/users")
//    public String getUserInfo(@RequestHeader("Authorization") String token) {
//        // 인증된 사용자의 정보를 반환합니다.
//
//        return token;
//    }

    @GetMapping("/users")
    public ResponseEntity getUserInfo(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        System.out.println("userPrincipal = " + userPrincipal);


        return ResponseEntity.ok(userPrincipal.getAttributes());
    }
}
