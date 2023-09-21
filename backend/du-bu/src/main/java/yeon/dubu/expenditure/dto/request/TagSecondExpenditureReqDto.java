package yeon.dubu.expenditure.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagSecondExpenditureReqDto {
    private Long firstTagId;
    private String secondTagName;

    @Builder
    public TagSecondExpenditureReqDto(Long firstTagId, String secondTagName) {
        this.firstTagId = firstTagId;
        this.secondTagName = secondTagName;
    }
}
