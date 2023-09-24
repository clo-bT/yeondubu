import React from 'react';
import wife from '../../assets/Common/wife.svg';
import styled from 'styled-components';

const Container = styled.div`
margin-top: 40px;
display: inline-flex;
flex-direction: column;
align-items: center;

`

const InfoBox = styled.div`
width: 254px;
height: 205px;
margin-bottom: 20px;

`
const WifeImg = styled.img`
width: 130px;
height: 130px;
flex-shrink: 0;
border-radius: 146.483px;
`
const InputAccount = styled.p`
color: #000;
text-align: center;
font-size: 17px;
font-style: normal;
font-weight: 400;
line-height: normal;
`


const ScoreInputHeader = () => {
    return (
    <Container>
        <InfoBox>
        <WifeImg src={wife}/>
        <InputAccount>맞춤형 서비스를 이용하시려면 <br />아래 정보를 입력해주세요</InputAccount>

        </InfoBox>

    </Container>
    );
};

export default ScoreInputHeader;