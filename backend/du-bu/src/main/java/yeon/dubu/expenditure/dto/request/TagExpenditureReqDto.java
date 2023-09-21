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

    @Getter
    @Setter
    @NoArgsConstructor
    @ToString
    public static class MoneyExpenditureReqDto {
        private String firstTagName;
        private String secondTagName;
        private String thirdTagName;
        private UserRole userRole;
        private LocalDate date;
        private Long amount;
        private String memo;

        @Builder
        public MoneyExpenditureReqDto(String firstTagName, String secondTagName, String thirdTagName, UserRole userRole, LocalDate date, Long amount, String memo) {
            this.firstTagName = firstTagName;
            this.secondTagName = secondTagName;
            this.thirdTagName = thirdTagName;
            this.userRole = userRole;
            this.date = date;
            this.amount = amount;
            this.memo = memo;
        }

        @QueryProjection
        public MoneyExpenditureReqDto(String firstTagName, String secondTagName, String thirdTagName) {
            this.firstTagName = firstTagName;
            this.secondTagName = secondTagName;
            this.thirdTagName = thirdTagName;
        }
    }
}
