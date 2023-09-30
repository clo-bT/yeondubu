package yeon.dubu.income.dto.query;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.YearMonth;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class IncomeGraphDto {
    private YearMonth yearMonth;
    private Long income;

    @QueryProjection
    public IncomeGraphDto(YearMonth yearMonth, Long income) {
        this.yearMonth = yearMonth;
        this.income = income;
    }
}
