package yeon.dubu.expenditure.dto.response;

import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyExpenditureDetailResDto {
    private UserRole userRole;
    private LocalDate date;
    private Long amount;
    private String memo;
    private Boolean payComplete;

    @Builder
    public MoneyExpenditureDetailResDto(UserRole userRole, LocalDate date, Long amount, String memo, Boolean payComplete) {
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.payComplete = payComplete;
    }
}
