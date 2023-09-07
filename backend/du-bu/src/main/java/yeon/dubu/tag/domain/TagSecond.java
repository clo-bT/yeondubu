package yeon.dubu.tag.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagSecond extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long secondTagId;

    private String secondTagName;

    @ManyToOne(fetch = FetchType.LAZY)
    private TagFirst tagFirst;

}
