package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllFirstTagExpenditureResDto {
    private Long tagId;
    private String firstTagName;
    private List<AllSecondTagExpenditureResDto> allSecondTagList;

    @Builder
    public AllFirstTagExpenditureResDto(Long tagId, String firstTagName, List<AllSecondTagExpenditureResDto> allSecondTagList) {
        this.tagId = tagId;
        this.firstTagName = firstTagName;
        this.allSecondTagList = allSecondTagList;
    }
    @QueryProjection
    public AllFirstTagExpenditureResDto(Long tagId, String firstTagName) {
        this.tagId = tagId;
        this.firstTagName = firstTagName;
    }
}
