package yeon.dubu.oauth.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.oauth.enumeration.AuthProvider;
import yeon.dubu.oauth.enumeration.Role;
import yeon.dubu.oauth.oauth2.OAuth2UserInfo;

@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@Entity
public class User extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String oauth2Id; // 로그인시 전달되는 id
    private String refreshToken;
    @NotNull
    private String name;  // 사용자 nickname
    @NotNull
    private String email;
    @NotNull
    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User update(OAuth2UserInfo oAuth2UserInfo) {
        this.name = oAuth2UserInfo.getName();
        this.oauth2Id = oAuth2UserInfo.getOAuth2Id();

        return this;
    }
}
