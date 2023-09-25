package yeon.dubu.account.dto.request;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavingAccountReqDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private Integer transferDay;
    private Long transferAmount;
    private LocalDate finalDate;


}
