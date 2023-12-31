import React from 'react';
import heart from '../../assets/Common/heart.svg';
import styled from 'styled-components';



const CoupleContainer = styled.div`
margin-top: 30px;
height: 190px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
cursor: pointer; /* 컴포넌트를 클릭 가능하게 만듭니다. */
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

const CoupleImage = ({ setIsBudgetOpen, isBudgetOpen }) => {
  const name = localStorage.getItem('name')
  const image = localStorage.getItem('image')
  const partnername = localStorage.getItem('partner_name')
  const partnerimage = localStorage.getItem('partner_img')
  
  const handleClick = () => {
    setIsBudgetOpen(!isBudgetOpen); // BudgetMoney의 높이를 토글
  };

    return (
      <div>
      <CoupleContainer isBudgetOpen={isBudgetOpen} onClick={handleClick}>
        <RowContainer>
          <CoupleContent>
            <WifeName>{name}</WifeName>
            <WifeImg src={image} />
          </CoupleContent>

          <HeartImg src={heart} />

          <CoupleContent>
            <HusbandName>{partnername}</HusbandName>
            <Husband src={partnerimage} />
          </CoupleContent>
        </RowContainer>
      </CoupleContainer>
      
    </div>
    );
};

export default CoupleImage;