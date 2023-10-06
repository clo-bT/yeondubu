import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-left : 20px;
margin-right : 20px;
margin-top: 35px;
`
const Header = styled.p`
color: #000;
font-size: 18px;
font-style: normal;
font-weight: bold; 
line-height: normal;
margin-top : 0px;

`

const HorizontalLine = styled.div`
width: 100%; 
height: 1.5px; 
background-color: #FFD0D0; 
margin-top: 20px; 
margin-bottom: 20px; 
`

const Detail = styled.a`
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;   
margin-top: 5px;
text-decoration: none;
`

const WholeTabContent = () => {
    return ( 
            <Container>
            <Header>추천 메뉴</Header>
            <Detail href="/shoppingmallcategory">가구 추천</Detail>
            <Detail href="/chatbot">챗봇</Detail>
            <HorizontalLine />
            <Header>체크리스트</Header>
            <Detail href="/checkboxwhole">체크리스트 수정</Detail>
            <HorizontalLine />
            <Header>고객센터</Header>
            <Detail href="/mooni">문의하기</Detail>
            <HorizontalLine />
        </Container>

    );
};

export default WholeTabContent;