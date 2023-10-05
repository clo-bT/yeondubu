package yeon.dubu.money.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.user.domain.User;

import static jakarta.persistence.FetchType.LAZY;

@DynamicInsert
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Money extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ColumnDefault("0")
    private Long totalCash; //총 현금
    @ColumnDefault("0")
    private Long totalAccount; //총 예적금
    @ColumnDefault("0")
    private Long expectExpenditure;  // 예상 지출
    @ColumnDefault("0")
    private Long completeExpenditure;  // 확정 지출

    @Builder
    public Money(Long id, Long totalCash, Long totalAccount, Long expectExpenditure, Long completeExpenditure, User user) {
        this.id = id;
        this.totalCash = totalCash;
        this.totalAccount = totalAccount;
        this.expectExpenditure = expectExpenditure;
        this.completeExpenditure = completeExpenditure;
        this.user = user;
    }

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

}
