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
public class TagSecondExpenditure extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String secondTagName;

    @ManyToOne(fetch = LAZY)
    private TagFirstExpenditure tagFirstExpenditure;
    @Builder
    public TagSecondExpenditure(Long id, String secondTagName, TagFirstExpenditure tagFirstExpenditure) {
        this.id = id;
        this.secondTagName = secondTagName;
        this.tagFirstExpenditure = tagFirstExpenditure;
    }
}
