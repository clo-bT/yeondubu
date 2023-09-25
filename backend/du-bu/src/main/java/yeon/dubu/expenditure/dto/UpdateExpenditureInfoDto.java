package yeon.dubu.expenditure.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UpdateExpenditureInfoDto {
    private Long beforeAmount; // 수정 전 금액
    private Long afterAmount;  // 수정 후 금액
    private Boolean payComplete; // 결제 완료 여부
    private Boolean payChanged; // 결제 완료 변경 여부
    private Boolean roleChanged; // 역할 변경 여부
    private Long afterUserId;  // 수정 후 사용자(role 정보 변경 없다면 해당 사용자)
    private Long beforeUserId; // 수정 전 사용자(role 정보 변경 없다면 해당 사용자)

    @Builder
    public UpdateExpenditureInfoDto(Long beforeAmount, Long afterAmount, Boolean payComplete, Boolean payChanged, Boolean roleChanged, Long afterUserId, Long beforeUserId) {
        this.beforeAmount = beforeAmount;
        this.afterAmount = afterAmount;
        this.payComplete = payComplete;
        this.payChanged = payChanged;
        this.roleChanged = roleChanged;
        this.afterUserId = afterUserId;
        this.beforeUserId = beforeUserId;
    }
}
