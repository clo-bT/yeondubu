package yeon.dubu.income.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.income.domain.MoneyIncome;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

@Getter
@Setter
public class MoneyIncomeResDto {
    private Long incomeId;
    private Long tagId;
    private String tagName;
    private LocalDate date;
    private Long amount;
    private String memo;
    private UserRole userRole;

    @Builder
    public MoneyIncomeResDto(Long incomeId, Long tagId, String tagName, LocalDate date, Long amount, String memo, UserRole userRole){
        this.incomeId = incomeId;
        this.tagId = tagId;
        this.tagName = tagName;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.userRole = userRole;
    }

    public static MoneyIncomeResDto from(MoneyIncome moneyIncome){
        return MoneyIncomeResDto.builder()
                .incomeId(moneyIncome.getId())
                .tagId(moneyIncome.getTagIncome().getId())
                .tagName(moneyIncome.getTagIncome().getTagName())
                .date(moneyIncome.getDate())
                .amount(moneyIncome.getAmount())
                .memo(moneyIncome.getMemo())
                .userRole(moneyIncome.getUserRole())
                .build();
    }
}
