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
        thirdTags0.put(0, Arrays.asList("웨딩홀 예약금", "웨딩홀 추가금", "사회", "축가"));  // 예식장
        thirdTagDict.put(0, thirdTags0);

        Map<Integer, List<String>> thirdTags1 = new HashMap<>();
        thirdTags1.put(0, Arrays.asList("헤어 및 메이크업", "드레스", "정장"));  // 부부 스드메 및 스튜디오
        thirdTags1.put(1, Arrays.asList("신랑-부", "신랑-모", "신부-모", "신부-모")); // 혼주 메이크업
        thirdTags1.put(2, Arrays.asList("신랑-부", "신랑-모", "신부-모", "신부-모"));  // 혼주 한복
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
        thirdTags4.put(0, Arrays.asList("침대", "소파", "장롱", "식탁", "의자"));  // 가구
        thirdTags4.put(1, Arrays.asList("TV", "세탁기", "청소기", "냉장고", "에어컨", "선풍기")); // 가전
        thirdTags4.put(2, Arrays.asList("냄비", "수저", "그릇", "도마"));  // 주방 용품
        thirdTags4.put(3, Arrays.asList("냄비", "수저", "그릇", "도마"));  // 침구
        thirdTags4.put(4, Arrays.asList("냄비", "수저", "그릇", "도마"));  // 생활 용품
        thirdTagDict.put(4, thirdTags4);

        Map<Integer, List<String>> thirdTags5 = new HashMap<>();
        thirdTags5.put(0, Arrays.asList("식당", "카페"));
        thirdTagDict.put(5, thirdTags5);

        Map<Integer, List<String>> thirdTags6 = new HashMap<>();
        thirdTags6.put(0, Arrays.asList("기타"));
        thirdTagDict.put(6, thirdTags6);
    }

    public Map<Integer, Map<Integer,List<String>>> getThirdTagDict() {
        return this.thirdTagDict;
    }
}
