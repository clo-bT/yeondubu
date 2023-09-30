package yeon.dubu.money.dto.response;

import lombok.*;
import yeon.dubu.money.dto.query.MoneyListDto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyYearMonthResDto {
    private LocalDate minDate;
    private LocalDate maxDate;
    private List<MoneyListDto> moneyList;

    @Builder
    public MoneyYearMonthResDto(LocalDate minDate, LocalDate maxDate, List<MoneyListDto> moneyList) {
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.moneyList = moneyList;
    }
}
