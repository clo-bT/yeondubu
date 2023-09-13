import React, { useEffect, useRef, useState } from 'react';
import wife from '../../assets/Common/wife.svg';
import husband from '../../assets/Common/husband.svg';
import heart from '../../assets/Common/heart.svg';
import styled from 'styled-components';



const CoupleContainer = styled.div`
margin-top: 30px;
height: ${({ isBudgetOpen }) => (isBudgetOpen ? '92px' : '182px')};
height: 182px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer; 
`


const WifeImg = styled.img`
width: 130px;
height: 130px;
flex-shrink: 0;
border-radius: 146.483px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`

const Husband = styled.img`
width: 130px;
height: 130px;
flex-shrink: 0;
border-radius: 146.483px;
background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`



const HeartImg = styled.img`
width: 41px;
height: 37px;
flex-shrink: 0;
margin-top: 100px;
margin-bottom: 50px;
margin-left:10px;
margin-right:10px;
`
const WifeName = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const HusbandName = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const CoupleContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const RowContainer = styled.div`
    display: flex;
    align-items: center;
`

const CoupleImage = ({ onScroll }) => {
  const coupleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const coupleTop = coupleRef.current.getBoundingClientRect().top;
      const halfBudgetMoneyHeight = window.innerHeight / 2;

      if (scrollY > coupleTop - halfBudgetMoneyHeight) {
        onScroll(false); // CoupleImage가 BudgetMoney 위로 스크롤될 때 호출
      } else {
        onScroll(true); // CoupleImage가 BudgetMoney 아래로 스크롤될 때 호출
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onScroll]);

  const handleCoupleClick = () => {
    onScroll(true); // CoupleImage 클릭 시 BudgetMoney 컨테이너를 다시 전체로 보이도록 업데이트
  };


    return (
      <div>
      <CoupleContainer isBudgetOpen={isBudgetOpen} onClick={handleCoupleClick}>
        <RowContainer>
          <CoupleContent>
            <WifeName>손예진</WifeName>
            <WifeImg src={wife} />
          </CoupleContent>

          <HeartImg src={heart} />

          <CoupleContent>
            <HusbandName>현빈</HusbandName>
            <Husband src={husband} />
          </CoupleContent>
        </RowContainer>
      </CoupleContainer>
      
    </div>
    );
};

export default CoupleImage;