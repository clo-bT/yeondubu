import React from 'react';
import styled from 'styled-components';
import { Link , useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 10px;

`

const GetOutButton = styled.a`
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

const RecommendationHeader = () => {
    const {category, subcategory} = useParams();
    const name = localStorage.getItem('name') || '고객';
    return (
        <div>
            <Container>
            <Link to = {`/shoppingmall/${category}/${subcategory}`}>
                <GetOutButton>나가기</GetOutButton>
            </Link>
            <RecommendHeader>이미지로 상품 찾기</RecommendHeader>
            <RecommendDetail>{name}님에게 맞춤형 가구/가전/예물을 추천해드려요</RecommendDetail>
            </Container>
            <HorizontalLine />
        </div>
    );
};

export default RecommendationHeader;