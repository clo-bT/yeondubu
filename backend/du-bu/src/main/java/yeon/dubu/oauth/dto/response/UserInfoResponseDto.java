package yeon.dubu.oauth.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResponseDto {
    private Long id;
    private String email;
    private String imgUrl;

    @Builder
    public UserInfoResponseDto(Long id, String email, String imgUrl) {
        this.id = id;
        this.email = email;
        this.imgUrl = imgUrl;
    }
}
