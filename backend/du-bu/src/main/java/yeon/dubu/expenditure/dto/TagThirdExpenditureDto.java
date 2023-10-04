package yeon.dubu.expenditure.dto;

import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagThirdExpenditureDto {
    private Long thirdTagId;
    private String thirdTagName;
    private Long moneyExpenditureId;
    private Long amount;
    private UserRole userRole;
    private Boolean payComplete;

    @Builder
    public TagThirdExpenditureDto(Long thirdTagId, String thirdTagName, Long moneyExpenditureId, Long amount, UserRole userRole, Boolean payComplete) {
        this.thirdTagId = thirdTagId;
        this.thirdTagName = thirdTagName;
        this.moneyExpenditureId = moneyExpenditureId;
        this.amount = amount;
        this.userRole = userRole;
        this.payComplete = payComplete;
    }
}
