package yeon.dubu.stuff.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import yeon.dubu.BaseTimeEntity;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StuffTagFirst extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long firstTagId;

    private String firstTagName;
}
