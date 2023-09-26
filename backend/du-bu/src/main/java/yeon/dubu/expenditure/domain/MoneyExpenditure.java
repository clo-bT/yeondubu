package yeon.dubu.expenditure.domain;

import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;
import org.hibernate.annotations.ColumnDefault;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.expenditure.dto.request.MoneyExpenditureReqDto;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class MoneyExpenditure extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private UserRole userRole;   // 신랑 or 신부

    @NotNull
    private LocalDate date; //거래날짜

    @NotNull
    private Long amount; //금액

    private String memo; //메모

    @ColumnDefault("false")
    private Boolean payComplete; // 결제 완료 여부

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "THIRD_TAG_EXPENDITURE_ID")
    private TagThirdExpenditure tagThirdExpenditure;
    @Builder
    public MoneyExpenditure(Long id, UserRole userRole, LocalDate date, Long amount, String memo, Boolean payComplete, TagThirdExpenditure tagThirdExpenditure) {
        this.id = id;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.payComplete = payComplete;
        this.tagThirdExpenditure = tagThirdExpenditure;
    }

    public void initalUpdate(MoneyExpenditure moneyExpenditure) {
        moneyExpenditure.setUserRole(moneyExpenditure.getUserRole());
        moneyExpenditure.setAmount(moneyExpenditure.getAmount());
        moneyExpenditure.setDate(moneyExpenditure.getDate());
        moneyExpenditure.setMemo(moneyExpenditure.getMemo());
        moneyExpenditure.setPayComplete(moneyExpenditure.getPayComplete());
    }
}
