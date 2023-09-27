package yeon.dubu.expenditure.dto.query;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllTagsExpenditureQueryDto {
    private Long firstTagId;
    private String firstTagName;
    private Long secondTagId;
    private String secondTagName;
    private Long thirdTagId;
    private String thirdTagName;
    private Long moneyExpenditureId;
    private Long amount;
    private Boolean payComplete;

    @QueryProjection
    public AllTagsExpenditureQueryDto(Long firstTagId, String firstTagName, Long secondTagId, String secondTagName, Long thirdTagId, String thirdTagName, Long moneyExpenditureId, Long amount, Boolean payComplete) {
        this.firstTagId = firstTagId;
        this.firstTagName = firstTagName;
        this.secondTagId = secondTagId;
        this.secondTagName = secondTagName;
        this.thirdTagId = thirdTagId;
        this.thirdTagName = thirdTagName;
        this.moneyExpenditureId = moneyExpenditureId;
        this.amount = amount;
        this.payComplete = payComplete;
    }
}
