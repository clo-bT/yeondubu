package yeon.dubu.category.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagExpenditureReqDto {
    private String firstTagName;
    private String secondTagName;
    private String thirdTagName;

    @Builder
    public TagExpenditureReqDto(String firstTagName, String secondTagName, String thirdTagName) {
        this.firstTagName = firstTagName;
        this.secondTagName = secondTagName;
        this.thirdTagName = thirdTagName;
    }
}
