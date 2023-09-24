package yeon.dubu.expenditure.dto.response;

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
