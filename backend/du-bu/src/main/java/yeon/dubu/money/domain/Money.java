package yeon.dubu.money.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.member.domain.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Money extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long totalCash; // 총 현금
    private Long totalAccount; // 총 예적금 금액
    private Long presentExpenditure; // 현재까지 지출
    private Long futureExpenditure; // 미래 지출

    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

}
