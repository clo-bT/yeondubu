package yeon.dubu.oauth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
public class AuthController {

//    @GetMapping(value = "token")
//    public String token(@RequestParam String token, @RequestParam String error) {
//        if (StringUtils.isNotBlank(error)) {
//            return error;
//        } else {
//            return token;
//        }
//    }

    @GetMapping(value = "token")
    public String token(@RequestParam String token, @RequestParam String error) {
        if (error != null && !error.isBlank()) {
            return error;
        } else {
            return token;
        }
    }

}
