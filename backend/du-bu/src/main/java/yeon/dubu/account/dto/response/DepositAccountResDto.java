package yeon.dubu.account.dto.response;

import java.time.LocalDate;
import lombok.Builder;
import yeon.dubu.account.domain.Account;

public class DepositAccountResDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private Integer transferDay;
    private Long transferAmount;
    private LocalDate finalDate;
    private Long userId;
    @Builder
    public DepositAccountResDto(String accountName, Long startAmount, Long finalAmount, Integer transferDay, Long transferAmount, LocalDate finalDate, Long userId){
        this.accountName = accountName;
        this.startAmount = startAmount;
        this.finalAmount = finalAmount;
        this.transferDay = transferDay;
        this.transferAmount = transferAmount;
        this.finalDate = finalDate;
    }
    private static DepositAccountResDto from(Account account){
        return DepositAccountResDto.builder()
            .accountName(account.getName())
            .startAmount(account.getStartAmount())
            .finalAmount(account.getFinalAmount())
            .transferDay(account.getTransferDay())
            .transferAmount(account.getTransferAmount())
            .finalDate(account.getFinalDate())
            .build();
    }
}
