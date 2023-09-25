package yeon.dubu.expenditure.dto.request;

import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyExpenditureReqDto {
    private Long thirdTagId;
    private UserRole userRole;
    private LocalDate date;
    private Long amount;
    private String memo;
    private Boolean payComplete;

    @Builder
    public MoneyExpenditureReqDto(Long thirdTagId, UserRole userRole, LocalDate date, Long amount, String memo, Boolean payComplete) {
        this.thirdTagId = thirdTagId;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.payComplete = payComplete;
    }
}