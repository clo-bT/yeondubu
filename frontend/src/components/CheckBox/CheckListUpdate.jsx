import { React, useState } from 'react';
import styled from 'styled-components';
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";

const Container = styled.div`
margin-top:-25px;
display: flex;
flex-direction: column;
align-items: flex-start;
margin-left: 20px;
`
const FirstTag = styled.p`
color: #000;
text-align: left;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;    
margin-top:40px;
`
const SecondTag = styled.p`
color: #000;
text-align: left;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const ThirdTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 
`
const MinusIcon = styled(AiFillMinusCircle)`
color: #FF937D4D;
cursor: pointer;
margin-left: 7px;
`

const CheckListUpdate = () => {
  const [dummyData, setDummyData] = useState([
    {
      index: 0,
      firstTag: '혼수',
      secondTag: '가구',
      thirdTag: [
        '침대',
        '장롱',
        '쇼파',
        '식탁',
      ],
    },
    {
      index: 1,
      firstTag: '혼수',
      secondTag: '가전',
      thirdTag: [
        'TV',
        '세탁기',
        '청소기',
        '냉장고',
      ],
    },
    {
      index: 2,
      firstTag: '혼수',
      secondTag: '기타',
      thirdTag: [
        '냄비',
        '수저',
        '그릇',
        '도마',
      ],
    },
    {
      index: 3,
      firstTag: '결혼식',
      secondTag: '스튜디오',
      thirdTag: [
        '냄비',
        '수저',
        '그릇',
        '도마',
      ],
    },
    {
      index: 4,
      firstTag: '결혼식',
      secondTag: '드레스',
      thirdTag: [
        '드레스',
        '한복',
      ],
    },
    {
      index: 5,
      firstTag: '결혼식',
      secondTag: '메이크업',
      thirdTag: [
        '혼주 메이크업',
      ],
    },
    {
      index: 6,
      firstTag: '결혼식',
      secondTag: '예식장',
      thirdTag: [
        '웨딩홀 대관',
        '사회',
        '축가',
      ],
    },
  ]);

  const uniqueFirstTags = {}; // 고유한 firstTag를 추적하기 위한 객체

  const removeThirdTag = (firstTagIndex, thirdTagIndex) => {
    const updatedDummyData = [...dummyData];
    updatedDummyData[firstTagIndex].thirdTag.splice(thirdTagIndex, 1);
    setDummyData(updatedDummyData);
  };

  return (
    <Container>
      {dummyData.map((item, firstTagIndex) => (
        <div key={item.index}>
            {/* 첫 번째 발견시에만 FirstTag를 조건부로 렌더링합니다 */}
            {uniqueFirstTags[item.firstTag] === undefined && (
              <FirstTag>{item.firstTag}</FirstTag>
            )}
          <SecondTag>{item.secondTag}</SecondTag>
          <ThirdTagContainer>
            {item.thirdTag.map((thirdItem, thirdTagIndex) => (
              <div key={thirdTagIndex}>
                <MinusIcon onClick={() => removeThirdTag(firstTagIndex, thirdTagIndex)} /> {thirdItem}
              </div>
            ))}
          </ThirdTagContainer>
          {/* 이제 해당 firstTag를 본 것으로 표시하여 미래에 다시 렌더링되지 않도록 합니다 */}
          {uniqueFirstTags[item.firstTag] = true}
        </div>
      ))}
    </Container>
  );
};

export default CheckListUpdate;