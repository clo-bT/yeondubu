package yeon.dubu.money.domain;
import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.category.domain.ExpenditureTag;
import yeon.dubu.category.domain.IncomeTag;
import yeon.dubu.user.enumeration.UserRole;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MoneyIncome {
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

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "INCOME_TAG_ID")
    private IncomeTag incomeTag;

    @Builder
    public MoneyIncome(Long id, UserRole userRole, LocalDate date, Long amount, String memo,
        IncomeTag incomeTag) {
        this.id = id;
        this.userRole = userRole;
        this.date = date;
        this.amount = amount;
        this.memo = memo;
        this.incomeTag = incomeTag;
    }
}