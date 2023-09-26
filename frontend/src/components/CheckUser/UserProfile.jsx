import React from 'react';
// import React, { useEffect } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

const Container = styled.div`
    background-color: #FFD0D0;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`
const CodeBox = styled.div`
    width: 343px;
    height: 502px;
    border-radius: 15px;
    background: #F5F5F5;
    gap:20px;
`
const Exit = styled.p`
    display: flex;
    flex-direction: column;
    align-items: end;
    font-size: 22px;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 0px;
`
const UserInfo = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    gap:20px;
    margin-top: 50px;
`
const Name = styled.div`
    color: #F33333;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const Image = styled.img`
    border-radius: 218px;
`
const Div = styled.div``
const CheckDiv = styled.div`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const ButtonGroup = styled.div`
    display:flex;
    flex-direction:column;
    gap : 5px;
`
const RightButton = styled.div`
    color: #F33333;
    display: flex;
    width: 100px;
    padding: 12px 34px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;
`
const WrongButton = styled.div`
    display: flex;
    width: 100px;
    padding: 12px 34px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;
`


const UserProfile = () => {
    // const accessToken = sessionStorage.getItem("token");
    // Local Storage에서 데이터를 가져오기
    // const partnerId = localStorage.getItem('partner_id');
    const partnerName = localStorage.getItem('partner_name');
    const partnerImg = localStorage.getItem('partner_img');

    return (
        <Container>
            <CodeBox>
                <Exit>X</Exit>
                <UserInfo>
                    <Name>{partnerName}</Name>
                    <Image src={partnerImg} alt="프로필 이미지" />
                    <Div>
                        <CheckDiv>연인을 확인해주세요</CheckDiv>
                        <ButtonGroup>
                            <RightButton>확인</RightButton>
                            <WrongButton>취소</WrongButton>
                        </ButtonGroup>
                    </Div>
                </UserInfo>
            </CodeBox>
        </Container>
    );
};

export default UserProfile;