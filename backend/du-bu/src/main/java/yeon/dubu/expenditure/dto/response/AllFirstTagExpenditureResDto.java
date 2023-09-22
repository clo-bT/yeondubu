package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllFirstTagExpenditureResDto {
    private Long firstTagId;
    private String firstTagName;
    private List<AllSecondTagExpenditureResDto> allSecondTagList;

    @QueryProjection
    public AllFirstTagExpenditureResDto(Long firstTagId, String firstTagName, List<AllSecondTagExpenditureResDto> allSecondTagList) {
        this.firstTagId = firstTagId;
        this.firstTagName = firstTagName;
        this.allSecondTagList = allSecondTagList;
    }


}
