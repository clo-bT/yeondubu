package yeon.dubu.stuff.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stuff extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String link;
    private String image;
    private String lowPrice;
    private String imageVector;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUFF_TAG_ID")
    private Stuff stuff;

    @Builder
    public Stuff(Long id, String title, String link, String image, String lowPrice,
        String imageVector,
        Stuff stuff) {
        this.id = id;
        this.title = title;
        this.link = link;
        this.image = image;
        this.lowPrice = lowPrice;
        this.imageVector = imageVector;
        this.stuff = stuff;
    }
}
