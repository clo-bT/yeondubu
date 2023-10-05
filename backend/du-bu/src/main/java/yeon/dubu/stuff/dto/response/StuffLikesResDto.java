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
    private Long itemId;
    private String category;
    private String subCategory;

    @QueryProjection
    public StuffLikesResDto(Long stuffId, Long likesId, Long itemId, String category, String subCategory) {
        this.stuffId = stuffId;
        this.likesId = likesId;
        this.itemId = itemId;
        this.category = category;
        this.subCategory = subCategory;
    }
}
