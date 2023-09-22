package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.couple.domain.Couple;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagFirstExpenditure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstTagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;
    @Builder
    public TagFirstExpenditure(Long id, String firstTagName, Couple couple) {
        this.id = id;
        this.firstTagName = firstTagName;
        this.couple = couple;
    }
}
