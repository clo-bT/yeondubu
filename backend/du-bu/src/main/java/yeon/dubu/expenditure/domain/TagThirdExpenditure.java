package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.couple.domain.Couple;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagThirdExpenditure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String thirdTagName;

    @ManyToOne(fetch = LAZY)
    private TagSecondExpenditure tagSecondExpenditure;
    @Builder
    public TagThirdExpenditure(Long id, String thirdTagName, TagSecondExpenditure tagSecondExpenditure) {
        this.id = id;
        this.thirdTagName = thirdTagName;
        this.tagSecondExpenditure = tagSecondExpenditure;
    }
}
