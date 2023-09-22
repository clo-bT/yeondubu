package yeon.dubu.expenditure.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagThirdExpenditureReqDto {
    private Long firstTagId;
    private Long secondTagId;
    private String thirdTagName;

    @Builder
    public TagThirdExpenditureReqDto(Long firstTagId, Long secondTagId, String thirdTagName) {
        this.firstTagId = firstTagId;
        this.secondTagId = secondTagId;
        this.thirdTagName = thirdTagName;
    }
}
