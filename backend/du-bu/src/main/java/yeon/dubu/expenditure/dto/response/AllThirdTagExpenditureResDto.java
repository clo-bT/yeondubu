package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllThirdTagExpenditureResDto {
    private Long thirdTagId;
    private String thirdTagName;
    private Long moneyExpenditureId;
    private Long amount;

    @QueryProjection
    public AllThirdTagExpenditureResDto(Long thirdTagId, String thirdTagName, Long moneyExpenditureId, Long amount) {
        this.thirdTagId = thirdTagId;
        this.thirdTagName = thirdTagName;
        this.moneyExpenditureId = moneyExpenditureId;
        this.amount = amount;
    }

//    @QueryProjection
//    public AllThirdTagExpenditureResDto(Long thirdTagId, String thirdTagName) {
//        this.thirdTagId = thirdTagId;
//        this.thirdTagName = thirdTagName;
//    }
}
