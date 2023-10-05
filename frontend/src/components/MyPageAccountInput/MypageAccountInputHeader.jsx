import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
/* margin-top: 70px; */
display: flex;
flex-direction: column;
/* align-items: center; */
`

const InfoBox = styled.div`
width: 254px;
height: 205px;
margin-bottom: 100px;
display: flex;
flex-direction: column;
align-items: center;
margin: 0 auto;
`
const WifeImg = styled.img`
width: 139.232px;
height: 146.483px;
flex-shrink: 0;
border-radius: 146.483px;
margin-top: 50px;
`
const InputAccount = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const MyPageAccountInputHeader = () => {
    const name = localStorage.getItem('name')
    const image = localStorage.getItem('image')
    return (
        <Container>
            <InfoBox>
            <WifeImg src={image}/>
            <InputAccount>{name}님의 자산을 입력해주세요</InputAccount>

            </InfoBox>
        </Container>
    );
};

export default MyPageAccountInputHeader;