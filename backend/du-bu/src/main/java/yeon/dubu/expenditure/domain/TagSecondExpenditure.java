package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagSecondExpenditure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String secondTagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "FIRST_TAG_EXPENDITURE_ID")
    private TagFirstExpenditure tagFirstExpenditure;
    @Builder
    public TagSecondExpenditure(Long id, String secondTagName, TagFirstExpenditure tagFirstExpenditure) {
        this.id = id;
        this.secondTagName = secondTagName;
        this.tagFirstExpenditure = tagFirstExpenditure;
    }
}
