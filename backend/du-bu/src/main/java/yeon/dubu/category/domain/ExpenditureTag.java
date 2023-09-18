package yeon.dubu.category.domain;
import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
public class ExpenditureTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    private String firstTagName;

    private String secondTagName;
    private String thirdTagName;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "COUPLE_ID")
    private Couple couple;

    @Builder
    public ExpenditureTag(Long id, @NonNull String firstTagName, String secondTagName,
        String thirdTagName, Couple couple) {
        this.id = id;
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.thirdTagName = thirdTagName;
        this.couple = couple;
    }
}
