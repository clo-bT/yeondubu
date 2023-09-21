package yeon.dubu.expenditure.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllSecondTagExpenditureResDto {
    private String secondTagName;

    @Builder
    public AllSecondTagExpenditureResDto(String secondTagName) {
        this.secondTagName = secondTagName;
    }
}
