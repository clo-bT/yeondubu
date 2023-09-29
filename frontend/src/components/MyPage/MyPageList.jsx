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
const MyPageList = () => {
    return (
        <Container>
            {/* <HorizontalLine /> */}
            <Header>내 계좌 관리</Header>
            <Detail href="/myaccount">계좌 조회/수정</Detail>
            <HorizontalLine />
            <Header>장바구니</Header>
            <Detail href="/myproductlike">내가 찜한 상품</Detail>
            <HorizontalLine />
            <Header>기타 기능</Header>
            <Detail href="/userwithdraw">파혼하기</Detail>
            <HorizontalLine />
        </Container>
    );
};

export default MyPageList;