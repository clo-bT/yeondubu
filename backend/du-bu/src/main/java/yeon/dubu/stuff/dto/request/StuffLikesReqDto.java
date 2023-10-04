package yeon.dubu.stuff.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class StuffLikesReqDto {
    private String category;
    private String sub_category;
}
