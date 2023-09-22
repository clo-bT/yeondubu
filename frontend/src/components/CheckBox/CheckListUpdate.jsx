import { React, useState } from 'react';
import styled from 'styled-components';
import { AiFillMinusCircle } from "react-icons/ai";

const Container = styled.div`
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

`
const SecondTag = styled.p`
color: #000;
text-align: left;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`
const ThirdTag = styled.p`
color: #000;
text-align: left;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-right: 10px;
`

const ThirdTagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 
`
const MinusIcon = styled(AiFillMinusCircle)`
color: #FF937D4D;
margin-right: 5px;
cursor: pointer;
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

      

  const removeThirdTag = (firstTagIndex, thirdTagIndex) => {
    const updatedDummyData = [...dummyData];
    updatedDummyData[firstTagIndex].thirdTag.splice(thirdTagIndex, 1);
    setDummyData(updatedDummyData);
  };

  return (
    <Container>
      {dummyData.map((item, firstTagIndex) => (
        <div key={item.index}>
          <FirstTag>{item.firstTag}</FirstTag>
          <SecondTag>{item.secondTag}</SecondTag>
          <ThirdTagContainer>
            {item.thirdTag.map((thirdItem, thirdTagIndex) => (
              <div key={thirdTagIndex}>
                <MinusIcon onClick={() => removeThirdTag(firstTagIndex, thirdTagIndex)} /> {thirdItem}
              </div>
            ))}
          </ThirdTagContainer>
        </div>
      ))}
    </Container>
      );
    };

export default CheckListUpdate;