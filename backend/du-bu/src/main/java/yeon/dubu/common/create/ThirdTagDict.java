package yeon.dubu.common.create;

import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Component
public class ThirdTagDict {
    private Map<Integer, Map<Integer, List<String>>> thirdTagDict;

    public ThirdTagDict() {
        thirdTagDict = new HashMap<>();

        Map<Integer, List<String>> thirdTags0 = new HashMap<>();
        thirdTags0.put(0, Arrays.asList("식당", "카페"));
        thirdTagDict.put(0, thirdTags0);

        Map<Integer, List<String>> thirdTags1 = new HashMap<>();
        thirdTags1.put(0, Arrays.asList("장소 대여비", "사진 액자", "메이크업"));
        thirdTags1.put(1, Arrays.asList("신부 드레스", "신랑 양복", "신부 한복", "신랑 한복", "신부측 한복", "신랑측 한복"));
        thirdTags1.put(2, Arrays.asList("예비 부부 메이크업", "혼주 메이크업"));
        thirdTags1.put(3, Arrays.asList("웨딩홀 예약비", "웨딩홀 대관비", "사회", "축가"));
        thirdTagDict.put(1, thirdTags1);

        Map<Integer, List<String>> thirdTags2 = new HashMap<>();
        thirdTags2.put(0, Arrays.asList("항공권"));
        thirdTags2.put(1, Arrays.asList("숙박"));
        thirdTags2.put(2, Arrays.asList("여행 경비"));
        thirdTags2.put(3, Arrays.asList("신부 가족 선물", "신랑 가족 선물"));
        thirdTagDict.put(2, thirdTags2);

        Map<Integer, List<String>> thirdTags3 = new HashMap<>();
        thirdTags3.put(0, Arrays.asList("신혼집"));
        thirdTags3.put(1, Arrays.asList("인테리어 예약금", "인테리어 시공비"));
        thirdTags3.put(2, Arrays.asList("부동산 중개비"));
        thirdTagDict.put(3, thirdTags3);

        Map<Integer, List<String>> thirdTags4 = new HashMap<>();
        thirdTags4.put(0, Arrays.asList("침대", "소파", "장롱", "식탁", "의자"));
        thirdTags4.put(1, Arrays.asList("TV", "세탁기", "청소기", "냉장고", "에어컨", "선풍기"));
        thirdTags4.put(2, Arrays.asList("냄비", "수저", "그릇", "도마"));
        thirdTagDict.put(4, thirdTags4);

        Map<Integer, List<String>> thirdTags5 = new HashMap<>();
        thirdTags5.put(0, Arrays.asList("기타"));
        thirdTagDict.put(5, thirdTags5);
    }

    public Map<Integer, Map<Integer,List<String>>> getThirdTagDict() {
        return this.thirdTagDict;
    }
}
