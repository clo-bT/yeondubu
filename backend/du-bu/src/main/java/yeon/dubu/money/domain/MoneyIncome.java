package yeon.dubu.money.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.member.enumeration.Role;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MoneyIncome extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private LocalDate date;
    private Long amount;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Money money;

}
