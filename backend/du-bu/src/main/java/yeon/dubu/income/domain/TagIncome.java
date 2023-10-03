package yeon.dubu.income.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

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
    public TagIncome(Long id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }
}
