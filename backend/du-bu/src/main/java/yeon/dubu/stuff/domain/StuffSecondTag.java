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
public class StuffSecondTag extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long secondTagId;

    private String secondTagName;

    @ManyToOne(fetch = FetchType.LAZY)
    private StuffFirstTag stuffFirstTag;
}
