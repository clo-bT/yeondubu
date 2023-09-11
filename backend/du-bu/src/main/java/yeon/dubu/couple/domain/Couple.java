package yeon.dubu.couple.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.member.domain.Member;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Couple extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member groom;
    @ManyToOne
    private Member bride;

    private LocalDate weddingDate;

}
