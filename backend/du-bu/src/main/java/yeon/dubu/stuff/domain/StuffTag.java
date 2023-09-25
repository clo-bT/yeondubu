package yeon.dubu.stuff.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StuffTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstTagName; //첫번째 태그 이름
    private String secondTagName; //두번째 태그 이름
    private String brandName;

    public StuffTag(Long id, String firstTagName, String secondTagName, String brandName) {
        this.id = id;
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.brandName = brandName;
    }
}
