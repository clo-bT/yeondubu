package yeon.dubu.account.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.account.enumeration.AccountType;
import yeon.dubu.member.domain.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Account extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String finalAmount;

    @Enumerated(EnumType.STRING)
    private AccountType accountType; // 계좌 타입(예금, 적금)

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

}
