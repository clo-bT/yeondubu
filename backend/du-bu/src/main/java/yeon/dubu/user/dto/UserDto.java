package yeon.dubu.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.user.domain.User;

@Getter
@Setter
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String nickName;
    private String image;

    @Builder
    public UserDto(Long id, String nickName, String image) {
        this.id = id;
        this.nickName = nickName;
        this.image = image;
    }

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .nickName(user.getNickName())
                .image(user.getImage())
                .build();
    }
}
