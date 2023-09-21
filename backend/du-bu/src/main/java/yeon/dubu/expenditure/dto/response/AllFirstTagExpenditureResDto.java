package yeon.dubu.expenditure.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class AllFirstTagExpenditureResDto {
    private Long tagId;
    private String firstTagName;

    @Builder
    public AllFirstTagExpenditureResDto(Long tagId, String firstTagName) {
        this.tagId = tagId;
        this.firstTagName = firstTagName;
    }
}
