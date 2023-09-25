package yeon.dubu.income.domain;

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
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.couple.domain.Couple;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagIncome extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tagName;

    @Builder
    public TagIncome(Long id, String tagName, Couple couple) {
        this.id = id;
        this.tagName = tagName;
    }
}
