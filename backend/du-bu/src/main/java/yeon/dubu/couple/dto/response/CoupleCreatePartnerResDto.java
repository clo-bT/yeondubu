package yeon.dubu.couple.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CoupleCreatePartnerResDto {
    private String state;
    private Long partnerId;
    private String partnerName;
    private String partnerImg;
}
