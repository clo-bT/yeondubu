package yeon.dubu.category.domain;
import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.couple.domain.Couple;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagExpenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String firstTagName;

    private String secondTagName;
    private String thirdTagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    @Builder
    public TagExpenditure(Long id, @NotNull String firstTagName, String secondTagName,
                          String thirdTagName, Couple couple) {
        this.id = id;
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.thirdTagName = thirdTagName;
        this.couple = couple;
    }
}
