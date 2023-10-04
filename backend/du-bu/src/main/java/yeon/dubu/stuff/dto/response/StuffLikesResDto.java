package yeon.dubu.stuff.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class StuffLikesResDto {
    private Long stuffId;
    private Long likesId;
    private String category;
    private String subCategory;

    @QueryProjection
    public StuffLikesResDto(Long stuffId, Long likesId, String category, String subCategory) {
        this.stuffId = stuffId;
        this.likesId = likesId;
        this.category = category;
        this.subCategory = subCategory;
    }
}
