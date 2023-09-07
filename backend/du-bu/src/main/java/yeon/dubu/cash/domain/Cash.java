package yeon.dubu.cash.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.cash.enumeration.CashType;
import yeon.dubu.member.domain.Member;
import yeon.dubu.member.enumeration.Role;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cash extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private CashType cashType;
    private Long currentAmount;


    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

}
