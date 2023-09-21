package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllSecondTagExpenditureResDto {
    private String secondTagName;
    private List<AllThirdTagExpenditureResDto> allThirdTagList;

    @Builder
    public AllSecondTagExpenditureResDto(String secondTagName, List<AllThirdTagExpenditureResDto> allThirdTagList) {
        this.secondTagName = secondTagName;
        this.allThirdTagList = allThirdTagList;
    }

    @QueryProjection
    public AllSecondTagExpenditureResDto(String secondTagName) {
        this.secondTagName = secondTagName;
    }
}
