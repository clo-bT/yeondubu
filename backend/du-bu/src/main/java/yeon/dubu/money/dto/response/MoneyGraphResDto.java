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
    private Long income;
    private Long expenditure;

    @Builder
    public MoneyGraphResDto(YearMonth yearMonth, Long income, Long expenditure) {
        this.yearMonth = yearMonth;
        this.income = income;
        this.expenditure = expenditure;
    }
}
