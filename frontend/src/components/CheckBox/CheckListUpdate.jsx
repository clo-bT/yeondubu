import React from 'react';
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
font-family: Inter;
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
`

const HorizonLine = styled.p`
background: #FFD0D0;    
margin-top: 35px;
width: 100%;
height: 1.5px;
`

const CheckListUpdate = () => {
    const dummyData = [
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
      ];
      
      let currentFirstTag = ''; // 현재의 firstTag 값을 저장하는 변수

      return (
        <Container>
          {dummyData.map((item) => {
            if (item.firstTag !== currentFirstTag) {
              currentFirstTag = item.firstTag; // 현재의 firstTag 값을 업데이트
              return (
                <div key={item.index}>
                  <FirstTag>{item.firstTag}</FirstTag>
                  <SecondTag>{item.secondTag}</SecondTag>
                  <ThirdTagContainer>
                  
                  {item.thirdTag.map((thirdItem, index) => (
                    <ThirdTag key={index}>< MinusIcon /> {thirdItem}</ThirdTag>
                  ))}

                  </ThirdTagContainer>
                </div>
              );
            } else {
              return (
                <div key={item.index}>
                  <SecondTag>{item.secondTag}</SecondTag>
                  <ThirdTagContainer>
                    {item.thirdTag.map((thirdItem, index) => (
                    <ThirdTag key={index}>< MinusIcon />{thirdItem}</ThirdTag>
                  ))}  
                  </ThirdTagContainer>
                </div>
              );
            }
        })}

        </Container>
      );
    };

export default CheckListUpdate;