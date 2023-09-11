package yeon.dubu.user.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.user.enumeration.Role;

import java.io.Serializable;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseTimeEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String nickName;
    private String provider;
    private String providerId;
    private Boolean isAdmin;
    private String image;

    @Enumerated(EnumType.STRING)
    private Role role;

    private float credit_score;  // 신용점수

    @Builder
    public User(Long id, String name, String nickName, String provider, String providerId, Boolean isAdmin, String image, Role role, float credit_score) {
        this.id = id;
        this.name = name;
        this.nickName = nickName;
        this.provider = provider;
        this.providerId = providerId;
        this.isAdmin = isAdmin;
        this.image = image;
        this.role = role;
        this.credit_score = credit_score;
    }


}
