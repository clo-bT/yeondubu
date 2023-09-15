package yeon.dubu.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSignUpResponseDto {
    private Long id;
    private String email;
    private String imgUrl;

    @Builder
    public UserSignUpResponseDto(Long id, String email, String imgUrl) {
        this.id = id;
        this.email = email;
        this.imgUrl = imgUrl;
    }
}
