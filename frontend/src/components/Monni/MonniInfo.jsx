import React from 'react';
import jae from '../../assets/Monni/jae.svg';
import jh from '../../assets/Monni/jh.svg';
import jin from '../../assets/Monni/jin.svg';
// import sh from '../../assets/Monni/sh.svg';
import sw from '../../assets/Monni/sw.svg';
import ys from '../../assets/Monni/ys.svg';
import styled from 'styled-components';


const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap; /* 화면 크기에 따라 요소들이 줄 바꿈될 수 있도록 설정 */
  justify-content: center; 
  margin-bottom: 100px;
`
const Position = styled.p`
color: #000;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const Img = styled.img`
width: 100px;
height: 100px;
margin: 0 auto;
`
const Name = styled.p`
color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const Email = styled.p`
color: #000;
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const Item = styled.div`
  text-align: center;
  margin: 0 10px; 
  width:150px;
`;

const MonniInfo = () => {
    return (
        <Container>
        <Item>
        <Position>Data</Position>
        <Img src={jae} />
        <Name>조재웅</Name>
        <Email>jaewoongcho93@gmail.com</Email>
        </Item>
        <Item>
        <Position>Data</Position>
        <Img src={jin} />
        <Name>유진욱</Name>
        <Email>songjunggi@gmail.com</Email>
        </Item>
            

        <Item>
        <Position>Backend</Position>

        <Img src={jh} />
        <Name>김재헌</Name>
        <Email>tint1998@gmail.com</Email>

        </Item>

        <Item>
        <Position>Backend</Position>
        <Img src={ys} />
        <Name>박영서</Name>
        <Email>youngseo0703@gmail.com</Email>   
        </Item>

        {/* <Item>
        <Position>Frontend</Position>
        <Img src={sh} />
        <Name>박승희</Name>
        <Email>pshee0329@naver.com</Email>
        </Item> */}

        <Item>
        <Position>Frontend</Position>
        <Img src={sw} />
        <Name>이성원</Name>
        <Email>tjddnjs4778@gmail.com</Email>

        </Item>
        </Container>
    );
};

export default MonniInfo;