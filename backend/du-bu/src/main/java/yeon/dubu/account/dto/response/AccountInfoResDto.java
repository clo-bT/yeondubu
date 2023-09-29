package yeon.dubu.account.dto.response;

import lombok.Getter;
import lombok.Setter;
import yeon.dubu.account.enumeration.AccountType;

@Getter
@Setter
public class AccountInfoResDto {
    private Long id;
    private String name;
    private Long price;
    private AccountType accountType;
}
