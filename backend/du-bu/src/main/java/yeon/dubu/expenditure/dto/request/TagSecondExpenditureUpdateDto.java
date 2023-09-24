package yeon.dubu.expenditure.dto.request;

import lombok.*;
import yeon.dubu.expenditure.domain.TagSecondExpenditure;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagSecondExpenditureUpdateDto {
    private Long secondTagId;
    private String secondTagName;

    @Builder
    public TagSecondExpenditureUpdateDto(Long secondTagId, String secondTagName) {
        this.secondTagId = secondTagId;
        this.secondTagName = secondTagName;
    }

    public void updateSecondTagName(TagSecondExpenditure tagSecondExpenditure) {
        tagSecondExpenditure.setSecondTagName(secondTagName);
    }
}
