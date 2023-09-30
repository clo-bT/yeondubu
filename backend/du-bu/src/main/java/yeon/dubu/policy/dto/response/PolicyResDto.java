package yeon.dubu.policy.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class PolicyResDto {
    private String policy;
    private String shortSummary;
    private String tag;
    private String subTag;
    private String url;


}
