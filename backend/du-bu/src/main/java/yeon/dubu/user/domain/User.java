package yeon.dubu.user.domain;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.auth.enumeration.AuthProvider;
import yeon.dubu.auth.enumeration.RoleType;
import yeon.dubu.auth.oauth2.OAuth2UserInfo;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.user.enumeration.UserRole;

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
    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private AuthProvider authProvider;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;  // adimin or user

    @Enumerated(EnumType.STRING)
    private UserRole userRole;   // 신랑 or 신부

    private Integer creditScore;  // 신용점수

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    public User update(OAuth2UserInfo oAuth2UserInfo) {
        this.name = oAuth2UserInfo.getName();
        this.oauth2Id = oAuth2UserInfo.getOAuth2Id();

        return this;
    }

    @Builder
    public User(Long id, String oauth2Id, String refreshToken, String name, String email, String imageUrl, AuthProvider authProvider, RoleType roleType) {
        this.id = id;
        this.oauth2Id = oauth2Id;
        this.refreshToken = refreshToken;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.authProvider = authProvider;
        this.roleType = roleType;
    }
}
