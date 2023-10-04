package yeon.dubu.stuff.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class StuffLikesResDto {
    private Long id;
    private String category;
    private String subCategory;

    @QueryProjection
    public StuffLikesResDto(Long id, String category, String subCategory) {
        this.id = id;
        this.category = category;
        this.subCategory = subCategory;
    }
}
