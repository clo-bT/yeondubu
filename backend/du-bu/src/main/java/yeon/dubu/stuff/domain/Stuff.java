package yeon.dubu.stuff.domain;

import jakarta.persistence.*;
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
    private Brand brand;

}
