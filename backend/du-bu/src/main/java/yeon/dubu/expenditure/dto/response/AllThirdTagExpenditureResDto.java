package yeon.dubu.expenditure.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllThirdTagExpenditureResDto {
    private String thirdTagName;
    private Long moneyId;
    private Long amount;

    @Builder
    @QueryProjection
    public AllThirdTagExpenditureResDto(String thirdTagName, Long moneyId, Long amount) {
        this.thirdTagName = thirdTagName;
        this.moneyId = moneyId;
        this.amount = amount;
    }

}
