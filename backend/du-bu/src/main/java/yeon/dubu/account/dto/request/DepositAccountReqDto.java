package yeon.dubu.account.dto.request;

import java.time.LocalDate;
import lombok.Builder;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.dto.response.DepositAccountResDto;

public class DepositAccountReqDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private Integer transferDay;
    private Long transferAmount;
    private LocalDate finalDate;

}
