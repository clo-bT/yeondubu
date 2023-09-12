import React from 'react';
import wife from '../../assets/Common/wife.svg';
import styled from 'styled-components';

const Container = styled.div`
margin-top: 70px;
display: inline-flex;
flex-direction: column;
align-items: center;

`

const InfoBox = styled.div`
width: 254px;
height: 205px;
margin-bottom: 90px;

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
        <InputAccount>손예진님의 신용점수를 입력해주세요</InputAccount>

        </InfoBox>
    </Container>
    );
};

export default ScoreInputHeader;