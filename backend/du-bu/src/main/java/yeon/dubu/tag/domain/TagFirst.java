package yeon.dubu.tag.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.couple.domain.Couple;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagFirst extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long firstTagId;

    private String firstTagName;

    @ManyToOne(fetch = FetchType.LAZY)
    private Couple couple;

}

