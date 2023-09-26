import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;

`

const GetoutButton = styled.a`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration: none;

`

const RecommendHeader = styled.p`
color: #FF6565;
font-size: 24px;
font-style: normal;
font-weight: 800;
line-height: normal;
margin-bottom: 5px;
`

const RecommendDetail = styled.p`
color: #6E7781;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const HorizontalLine = styled.div`
  width: 100%; 
  height: 1px; 
  background-color: #FFD0D0; 
  margin-top: 10px; 
  margin-top: 10px; 
  margin-bottom: 30px; 
`

const ShoppingHeader = () => {
    return (
        <>
             <Container>
            <GetoutButton href="/">나가기</GetoutButton>
            <RecommendHeader>맞춤형 제품 추천</RecommendHeader>
            <RecommendDetail>손예진님에게 맞춤형 가구/가전/예물을 추천해드려요</RecommendDetail>
        </Container>
            <HorizontalLine />
        </>
   
    );
};

export default ShoppingHeader;