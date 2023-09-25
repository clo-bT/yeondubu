package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.BaseTimeEntity;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class TagThirdExpenditure extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String thirdTagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "SECOND_TAG_EXPENDITURE_ID")
    private TagSecondExpenditure tagSecondExpenditure;
    @Builder
    public TagThirdExpenditure(Long id, String thirdTagName, TagSecondExpenditure tagSecondExpenditure) {
        this.id = id;
        this.thirdTagName = thirdTagName;
        this.tagSecondExpenditure = tagSecondExpenditure;
    }
}
