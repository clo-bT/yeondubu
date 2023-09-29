package yeon.dubu.account.dto.response;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.enumeration.AccountType;

@Getter
@Setter
public class DetailAccountResDto {
    private String accountName;
    private AccountType accountType;
    private Long startAmount;
    private Long finalAmount;
    private Integer transferDay;
    private Long transferAmount;
    private LocalDate finalDate;
    @Builder
    public DetailAccountResDto(String accountName, AccountType accountType, Long startAmount, Long finalAmount, Integer transferDay, Long transferAmount, LocalDate finalDate){
        this.accountName = accountName;
        this.accountType = accountType;
        this.startAmount = startAmount;
        this.finalAmount = finalAmount;
        this.transferDay = transferDay;
        this.transferAmount = transferAmount;
        this.finalDate = finalDate;
    }
    public static DetailAccountResDto from(Account account){
        return DetailAccountResDto.builder()
            .accountName(account.getName())
            .accountType(account.getAccountType())
            .startAmount(account.getStartAmount())
            .finalAmount(account.getFinalAmount())
            .transferDay(account.getTransferDay())
            .transferAmount(account.getTransferAmount())
            .finalDate(account.getFinalDate())
            .build();
    }
}
