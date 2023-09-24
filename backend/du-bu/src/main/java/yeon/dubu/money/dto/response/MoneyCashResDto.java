package yeon.dubu.money.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyCashResDto {
    private Long brideTotalCash;
    private Long groomTotalCash;

    @Builder
    public MoneyCashResDto(Long brideTotalCash, Long groomTotalCash) {
        this.brideTotalCash = brideTotalCash;
        this.groomTotalCash = groomTotalCash;
    }
}
