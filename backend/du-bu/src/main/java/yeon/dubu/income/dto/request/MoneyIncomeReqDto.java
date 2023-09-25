package yeon.dubu.income.dto.request;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.user.enumeration.UserRole;

@Getter
@Setter
public class MoneyIncomeReqDto {
    private UserRole userRole;
    private LocalDate date;
    private Long amount;
    private String memo;
    private Long tagId;

    public MoneyIncomeReqDto(UserRole userRole, LocalDate date, Long amount, String memo,
        Long tagId) {
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.tagId = tagId;
    }
}
