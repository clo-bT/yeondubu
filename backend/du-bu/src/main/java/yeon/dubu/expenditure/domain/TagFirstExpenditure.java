package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.couple.domain.Couple;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagFirstExpenditure extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstTagName;

    @ManyToOne(fetch = LAZY, cascade = CascadeType.REMOVE)
    private Couple couple;

    @Builder
    public TagFirstExpenditure(Long id, String firstTagName, Couple couple) {
        this.id = id;
        this.firstTagName = firstTagName;
        this.couple = couple;
    }
}
