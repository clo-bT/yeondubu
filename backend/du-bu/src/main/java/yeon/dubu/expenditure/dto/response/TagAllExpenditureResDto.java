package yeon.dubu.expenditure.dto.response;

import lombok.*;
import yeon.dubu.expenditure.dto.TagSecondExpenditureDto;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagAllExpenditureResDto {
    private Long firstTagId;
    private String firstTagName;
    private List<TagSecondExpenditureDto> tagSecondExpenditureDtoList;

    @Builder
    public TagAllExpenditureResDto(Long firstTagId, String firstTagName, List<TagSecondExpenditureDto> tagSecondExpenditureDtoList) {
        this.firstTagId = firstTagId;
        this.firstTagName = firstTagName;
        this.tagSecondExpenditureDtoList = tagSecondExpenditureDtoList;
    }
}
