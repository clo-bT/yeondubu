package yeon.dubu.account.dto.response;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.account.domain.Account;

@Getter
@Setter
public class SavingAccountResDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private LocalDate finalDate;
    @Builder
    public SavingAccountResDto(String accountName, Long startAmount, Long finalAmount,LocalDate finalDate){
        this.accountName = accountName;
        this.startAmount = startAmount;
        this.finalAmount = finalAmount;
        this.finalDate = finalDate;
    }
    public static SavingAccountResDto from(Account account){
        return SavingAccountResDto.builder()
                .accountName(account.getName())
                .startAmount(account.getStartAmount())
                .finalAmount(account.getFinalAmount())
                .finalDate(account.getFinalDate())
                .build();
    }
}
