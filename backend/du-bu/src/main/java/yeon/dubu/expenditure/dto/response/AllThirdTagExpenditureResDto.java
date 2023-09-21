package yeon.dubu.expenditure.dto.response;

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
    public AllThirdTagExpenditureResDto(String thirdTagName, Long moneyId, Long amount) {
        this.thirdTagName = thirdTagName;
        this.moneyId = moneyId;
        this.amount = amount;
    }

}
