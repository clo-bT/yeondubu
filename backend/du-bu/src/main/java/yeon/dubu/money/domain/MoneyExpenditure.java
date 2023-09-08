package yeon.dubu.money.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.member.enumeration.Role;
import yeon.dubu.tag.domain.TagThird;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MoneyExpenditure extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Long amount;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Money money;
    @ManyToOne(fetch = FetchType.LAZY)
    private TagThird tagThird;

}
