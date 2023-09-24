package yeon.dubu.expenditure.dto.request;

import lombok.*;
import yeon.dubu.expenditure.domain.TagFirstExpenditure;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagFirstExpenditureUpdateDto {
    private Long firstTagId;
    private String firstTagName;

    @Builder
    public TagFirstExpenditureUpdateDto(Long firstTagId, String firstTagName) {
        this.firstTagId = firstTagId;
        this.firstTagName = firstTagName;
    }

    public void updateFirstTag(TagFirstExpenditure tagFirstExpenditure) {
        tagFirstExpenditure.setFirstTagName(firstTagName);
    }
}
