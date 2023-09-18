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
import lombok.NonNull;
import lombok.Setter;
import yeon.dubu.couple.domain.Couple;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class IncomeTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String tagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    @Builder
    public IncomeTag(Long id, @NonNull String tagName, Couple couple) {
        this.id = id;
        this.tagName = tagName;
        this.couple = couple;
    }
}
