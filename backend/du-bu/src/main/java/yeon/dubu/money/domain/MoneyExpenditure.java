package yeon.dubu.money.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.tag.domain.TagThird;

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
