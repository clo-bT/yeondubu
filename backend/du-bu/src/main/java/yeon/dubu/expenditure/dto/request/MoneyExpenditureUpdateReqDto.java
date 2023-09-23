package yeon.dubu.expenditure.dto.request;

import lombok.*;
import yeon.dubu.expenditure.domain.MoneyExpenditure;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;
@Getter
@Setter
@NoArgsConstructor
@ToString
public class MoneyExpenditureUpdateReqDto {
    private Long expenditureId;
    private UserRole userRole;
    private LocalDate date;
    private Long amount;
    private String memo;
    private Boolean payComplete;

    @Builder
    public MoneyExpenditureUpdateReqDto(Long expenditureId, UserRole userRole, LocalDate date, Long amount, String memo, Boolean payComplete) {
        this.expenditureId = expenditureId;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.payComplete = payComplete;
    }


    public void update(MoneyExpenditure moneyExpenditure) {
        moneyExpenditure.setUserRole(userRole);
        moneyExpenditure.setDate(date);
        moneyExpenditure.setAmount(amount);
        moneyExpenditure.setMemo(memo);
        moneyExpenditure.setPayComplete(payComplete);
    }
}
