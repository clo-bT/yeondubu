package yeon.dubu.income.dto.request;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.user.enumeration.UserRole;

@Getter
@Setter
public class MoneyIncomeUpdateReqDto {
    private Long id;

    public MoneyIncomeUpdateReqDto(Long id, UserRole userRole, LocalDate date, Long amount,
        String memo,
        Long tagId) {
        this.id = id;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.tagId = tagId;
    }

    private UserRole userRole;
    private LocalDate date;
    private Long amount;
    private String memo;
    private Long tagId;
}
