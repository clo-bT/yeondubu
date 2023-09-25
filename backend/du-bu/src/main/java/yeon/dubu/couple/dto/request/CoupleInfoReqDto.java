package yeon.dubu.couple.dto.request;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.user.enumeration.UserRole;

@Getter
@Setter
public class CoupleInfoReqDto {
    private UserRole userRole;
    private LocalDate weddingDate;
}
