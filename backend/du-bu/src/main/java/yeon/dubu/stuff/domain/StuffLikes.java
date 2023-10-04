package yeon.dubu.stuff.domain;

import jakarta.persistence.*;
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
public class StuffLikes extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Couple couple;
    @ManyToOne(fetch = FetchType.LAZY)
    private Stuff stuff;

    @Builder
    public StuffLikes(Long id, Couple couple, Stuff stuff) {
        this.id = id;
        this.couple = couple;
        this.stuff = stuff;
    }
}
