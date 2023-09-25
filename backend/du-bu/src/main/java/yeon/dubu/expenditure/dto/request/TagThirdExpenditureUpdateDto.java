package yeon.dubu.expenditure.dto.request;

import lombok.*;
import yeon.dubu.expenditure.domain.TagThirdExpenditure;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagThirdExpenditureUpdateDto {
    private Long thirdTagId;
    private String thirdTagName;

    @Builder
    public TagThirdExpenditureUpdateDto(Long thirdTagId, String thirdTagName) {
        this.thirdTagId = thirdTagId;
        this.thirdTagName = thirdTagName;
    }

    public void updateThirdTagName(TagThirdExpenditure tagThirdExpenditure) {
        tagThirdExpenditure.setThirdTagName(thirdTagName);
    }
}
