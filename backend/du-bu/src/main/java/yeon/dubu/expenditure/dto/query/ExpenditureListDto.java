package yeon.dubu.expenditure.dto.query;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;
import yeon.dubu.user.enumeration.UserRole;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ExpenditureListDto {
    private LocalDate date;
    private Long expenditureId;
    private UserRole role;
    private Long firstTagId;
    private Long secondTagId;
    private Long thirdTagId;
    private String firstTagName;
    private String secondTagName;
    private String thirdTagName;
    private Long amount;
    private String memo;
    private Boolean payComplete;
    @Builder
    @QueryProjection
    public ExpenditureListDto(LocalDate date, Long expenditureId, UserRole role, Long firstTagId, Long secondTagId, Long thirdTagId, String firstTagName, String secondTagName, String thirdTagName, Long amount, String memo, Boolean payComplete) {
        this.date = date;
        this.expenditureId = expenditureId;
        this.role = role;
        this.firstTagId = firstTagId;
        this.secondTagId = secondTagId;
        this.thirdTagId = thirdTagId;
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.thirdTagName = thirdTagName;
        this.amount = amount;
        this.memo = memo;
        this.payComplete = payComplete;
    }
}
