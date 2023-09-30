package yeon.dubu.money.dto.query;

import lombok.*;
import yeon.dubu.expenditure.dto.query.ExpenditureListDto;
import yeon.dubu.income.dto.query.IncomeListDto;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyListDto {
    private LocalDate date;
    private Long income;
    private Long expenditure;
    private List<IncomeListDto> incomeList;
    private List<ExpenditureListDto> expenditureList;

    @Builder
    public MoneyListDto(LocalDate date, Long income, Long expenditure, List<IncomeListDto> incomeList, List<ExpenditureListDto> expenditureList) {
        this.date = date;
        this.income = income;
        this.expenditure = expenditure;
        this.incomeList = incomeList;
        this.expenditureList = expenditureList;
    }
}
