package yeon.dubu.expenditure.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class TagFirstExpenditureReqDto {
    private Long id;
    private String firstTagName;

    @Builder
    public TagFirstExpenditureReqDto(Long id, String firstTagName) {
        this.id = id;
        this.firstTagName = firstTagName;
    }
}
