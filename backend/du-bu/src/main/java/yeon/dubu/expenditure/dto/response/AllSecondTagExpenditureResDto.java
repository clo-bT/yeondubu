package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllSecondTagExpenditureResDto {
    private Long secondTagId;
    private String secondTagName;
    private List<AllThirdTagExpenditureResDto> allThirdTagList;

    @QueryProjection
    public AllSecondTagExpenditureResDto(Long secondTagId, String secondTagName, List<AllThirdTagExpenditureResDto> allThirdTagList) {
        this.secondTagId = secondTagId;
        this.secondTagName = secondTagName;
        this.allThirdTagList = allThirdTagList;
    }

}
