package yeon.dubu.expenditure.dto.request;

import com.querydsl.core.annotations.QueryProjection;
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

    @Builder
    public MoneyExpenditureReqDto(Long thirdTagId, UserRole userRole, LocalDate date, Long amount, String memo) {
        this.thirdTagId = thirdTagId;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
    }
}