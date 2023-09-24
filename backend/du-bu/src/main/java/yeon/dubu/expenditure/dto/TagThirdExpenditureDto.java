package yeon.dubu.expenditure.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagThirdExpenditureDto {
    private Long thirdTagId;
    private String thirdTagName;
    private Long moneyExpenditureId;
    private Long amount;

    @Builder
    public TagThirdExpenditureDto(Long thirdTagId, String thirdTagName, Long moneyExpenditureId, Long amount) {
        this.thirdTagId = thirdTagId;
        this.thirdTagName = thirdTagName;
        this.moneyExpenditureId = moneyExpenditureId;
        this.amount = amount;
    }
}
