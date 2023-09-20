package yeon.dubu.account.dto.request;

import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.account.domain.Account;
import yeon.dubu.account.dto.response.DepositAccountResDto;

@Getter
@Setter
public class DepositAccountReqDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private LocalDate finalDate;

}
