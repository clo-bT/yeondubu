package yeon.dubu.expenditure.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagSecondExpenditureDto {
    private Long secondTagId;
    private String secondTagName;
    private List<TagThirdExpenditureDto> tagThirdExpenditureDtoList;

    @Builder
    public TagSecondExpenditureDto(Long secondTagId, String secondTagName, List<TagThirdExpenditureDto> tagThirdExpenditureDtoList) {
        this.secondTagId = secondTagId;
        this.secondTagName = secondTagName;
        this.tagThirdExpenditureDtoList = tagThirdExpenditureDtoList;
    }
}
