package yeon.dubu.income.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import yeon.dubu.income.domain.TagIncome;

@Getter
@Setter
public class TagIncomeResDto {
    private Long id;
    private String tagName;

    @Builder
    public TagIncomeResDto(Long id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }

    public static TagIncomeResDto from(TagIncome tagIncome){
        return TagIncomeResDto.builder()
            .id(tagIncome.getId())
            .tagName(tagIncome.getTagName())
            .build();
    }
}
