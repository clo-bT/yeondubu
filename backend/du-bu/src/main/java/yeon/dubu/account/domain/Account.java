package yeon.dubu.account.domain;

import static jakarta.persistence.FetchType.LAZY;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;
import yeon.dubu.BaseTimeEntity;
import yeon.dubu.account.dto.request.DepositAccountReqDto;
import yeon.dubu.account.enumeration.AccountType;
import yeon.dubu.user.domain.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Account extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private AccountType accountType;
    @NotNull
    private String name;
    @NotNull
    private Long startAmount;
    @NotNull
    private Long finalAmount;
    @NotNull
    private Integer transferDay;
    @NotNull
    private Long transferAmount;
    @NotNull
    private LocalDate finalDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Builder
    public Account(Long id, AccountType accountType, String name, Long startAmount,
        Long finalAmount,
        Integer transferDay, Long transferAmount, LocalDate finalDate) {
        this.id = id;
        this.accountType = accountType;
        this.name = name;
        this.startAmount = startAmount;
        this.finalAmount = finalAmount;
        this.transferDay = transferDay;
        this.transferAmount = transferAmount;
        this.finalDate = finalDate;
    }

}
