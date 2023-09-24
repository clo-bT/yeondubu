package yeon.dubu.user.dto.response;

import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserResDto {
    private Long id;
    private String name;
    private String imageUrl;
    private UserRole userRole;
    private Integer creditScore;

    @Builder
    public UserResDto(Long id, String name, String imageUrl, UserRole userRole, Integer creditScore) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.userRole = userRole;
        this.creditScore = creditScore;
    }

}
