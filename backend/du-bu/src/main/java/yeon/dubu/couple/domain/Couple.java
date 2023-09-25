package yeon.dubu.couple.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Couple extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate weddingDate;

    @Builder
    public Couple(Long id, LocalDate weddingDate) {
        this.id = id;
        this.weddingDate = weddingDate;
    }
}
