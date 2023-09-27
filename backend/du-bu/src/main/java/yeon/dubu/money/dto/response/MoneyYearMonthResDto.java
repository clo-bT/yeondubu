package yeon.dubu.money.dto.response;

import lombok.*;
import yeon.dubu.money.dto.query.MoneyListDto;

import java.time.YearMonth;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyYearMonthResDto {
    private YearMonth minYearMonth;
    private YearMonth maxYearMonth;
    private List<MoneyListDto> moneyList;

    @Builder
    public MoneyYearMonthResDto(YearMonth minYearMonth, YearMonth maxYearMonth, List<MoneyListDto> moneyList) {
        this.minYearMonth = minYearMonth;
        this.maxYearMonth = maxYearMonth;
        this.moneyList = moneyList;
    }
}
