package yeon.dubu.money.dto.response;

import lombok.*;

import java.time.Year;
import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyGraphResDto {
    private YearMonth yearMonth;
    private Long income;  // couple의 수입(현금 + 예적금)
    private Long expenditure;  // couple의 지출

    @Builder
    public MoneyGraphResDto(YearMonth yearMonth, Long income, Long expenditure) {
        this.yearMonth = yearMonth;
        this.income = income;
        this.expenditure = expenditure;
    }
}
