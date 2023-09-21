package yeon.dubu.expenditure.dto.request;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagExpenditureReqDto {
    private String firstTagName;
    private String secondTagName;
    private String thirdTagName;

    @Builder
    public TagExpenditureReqDto(String firstTagName, String secondTagName, String thirdTagName) {
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.thirdTagName = thirdTagName;
    }


}
