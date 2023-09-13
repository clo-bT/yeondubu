package yeon.dubu.oauth.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInResponseDto {
    private String accessToken;
    private String refreshToken;

}
