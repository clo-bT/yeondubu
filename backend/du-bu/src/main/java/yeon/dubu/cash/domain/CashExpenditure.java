package yeon.dubu.cash.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.member.enumeration.Role;
import yeon.dubu.tag.domain.TagThird;

import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity
@Getter
@Setter
@NoArgsConstructor
public class CashExpenditure extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Long amount;
    private String memo;

    @ManyToOne(fetch = FetchType.LAZY)
    private Cash cash;
    @ManyToOne(fetch = FetchType.LAZY)
    private TagThird tagThird;

}
