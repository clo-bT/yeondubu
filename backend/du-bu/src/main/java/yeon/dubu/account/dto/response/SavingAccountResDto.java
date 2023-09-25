package yeon.dubu.account.dto.response;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SavingAccountResDto {
    private String accountName;
    private Long startAmount;
    private Long finalAmount;
    private LocalDate finalDate;

}
