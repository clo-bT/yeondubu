package yeon.dubu.money.domain;
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
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.couple.domain.Couple;
import yeon.dubu.user.domain.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Money extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long totalCash; //총 현금
    private Long totalAccount; //총 예적금
    private Long presentExpenditure; //현재까지 지출
    private Long futureExpenditure; //미래 지출


    @Builder
    public Money(Long id, Long totalCash, Long totalAccount, Long presentExpenditure,
        Long futureExpenditure, User user) {
        this.id = id;
        this.totalCash = totalCash;
        this.totalAccount = totalAccount;
        this.presentExpenditure = presentExpenditure;
        this.futureExpenditure = futureExpenditure;
        this.user = user;
    }

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

}
