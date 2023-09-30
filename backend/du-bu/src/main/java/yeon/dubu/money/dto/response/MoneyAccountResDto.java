package yeon.dubu.money.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyAccountResDto {
    private Long brideTotalAccount;
    private Long groomTotalAccount;

    @Builder
    public MoneyAccountResDto(Long brideTotalAccount, Long groomTotalAccount) {
        this.brideTotalAccount = brideTotalAccount;
        this.groomTotalAccount = groomTotalAccount;
    }
}
