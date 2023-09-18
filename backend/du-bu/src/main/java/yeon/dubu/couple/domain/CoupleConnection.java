package yeon.dubu.couple.domain;
import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.user.domain.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CoupleConnection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer code;
    private Boolean hostCheck;
    private Boolean guestCheck;
    private Boolean isCanceled;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "HOST_ID")
    private User host;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "GUEST_ID")
    private User guest;

    @Builder
    public CoupleConnection(Long id, Integer code, Boolean hostCheck, Boolean guestCheck,
        Boolean isCanceled, User host, User guest) {
        this.id = id;
        this.code = code;
        this.hostCheck = hostCheck;
        this.guestCheck = guestCheck;
        this.isCanceled = isCanceled;
        this.host = host;
        this.guest = guest;
    }
}
