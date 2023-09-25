package yeon.dubu.money.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TotalExpectExpenditureResDto {
    private Long totalExpenditure;

    @Builder
    public TotalExpectExpenditureResDto(Long totalExpenditure) {
        this.totalExpenditure = totalExpenditure;
    }
}
