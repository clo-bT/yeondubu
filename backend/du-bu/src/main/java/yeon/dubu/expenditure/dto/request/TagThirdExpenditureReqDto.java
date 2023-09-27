package yeon.dubu.expenditure.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagThirdExpenditureReqDto {
    private Long secondTagId;
    private String thirdTagName;

    @Builder
    public TagThirdExpenditureReqDto(Long secondTagId, String thirdTagName) {
        this.secondTagId = secondTagId;
        this.thirdTagName = thirdTagName;
    }
}
