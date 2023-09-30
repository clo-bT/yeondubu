package yeon.dubu.expenditure.dto.query;

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
public class ExpenditureGraphDto {
    private YearMonth yearMonth;
    private Long expenditure;

    @QueryProjection
    public ExpenditureGraphDto(YearMonth yearMonth, Long expenditure) {
        this.yearMonth = yearMonth;
        this.expenditure = expenditure;
    }
}
