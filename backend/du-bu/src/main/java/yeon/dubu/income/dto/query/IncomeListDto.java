package yeon.dubu.income.dto.query;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class IncomeListDto {
    private LocalDate date;
    private Long incomeId;
    private Long tagId;
    private String tagName;
    private Long amount;
    private String memo;

    @QueryProjection
    public IncomeListDto(LocalDate date, Long incomeId, Long tagId, String tagName, Long amount, String memo) {
        this.date = date;
        this.incomeId = incomeId;
        this.tagId = tagId;
        this.tagName = tagName;
        this.amount = amount;
        this.memo = memo;
    }
}
