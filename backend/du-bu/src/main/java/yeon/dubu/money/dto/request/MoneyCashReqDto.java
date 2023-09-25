package yeon.dubu.money.dto.request;

import lombok.*;
import yeon.dubu.money.domain.Money;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyCashReqDto {
    private Long totalCash;

    @Builder
    public MoneyCashReqDto(Long totalCash) {
        this.totalCash = totalCash;
    }

    public void update(Money money) {
        money.setTotalCash(totalCash);
    }
}
