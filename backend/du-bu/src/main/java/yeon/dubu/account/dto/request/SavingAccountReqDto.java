package yeon.dubu.account.dto.request;

import java.time.LocalDate;

public class SavingAccountReqDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private LocalDate finalDate;
}
