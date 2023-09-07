package yeon.dubu.cash.domain;

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
public class CashIncome extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cash cash;

}
