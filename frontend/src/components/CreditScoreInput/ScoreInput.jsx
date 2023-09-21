import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    
display: flex;
flex-direction: column;
align-items: center;

`
const ScoreInputBox = styled.input`
width: 150px;
height: 35px;
border: none; 
border-bottom: 1px solid rgba(0, 0, 0, 0.20); 
background: #FFF;
`

const Info = styled.p`
color: #FF6565;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
position: fixed; 
bottom: 0;
left: 0; 
right: 0; 
padding: 10px; 
`

const InputButton = styled.button`
display: inline-flex;
width: 120px;
height: 44px;
padding: 10px 30px;
justify-content: center;
align-items: center;
color: #FF5A5A;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
border: none;
border-radius: 10px;
margin-top: 20px;
`

const Box = styled.p`
  display: flex;
  align-items: center; 
  justify-content: space-between;
  width: 80%; 
  height: 22px;

 
`
const InfoHeader = styled.p`
color: #000;
text-align: center;
font-family: Inter;
font-size: 13px;
font-style: normal;
font-weight: 500;
line-height: normal;    

`
const ScoreInput = () => {
    return (
        <Container>
            <Box>
            <InfoHeader>예비 부부 합산 월소득</InfoHeader>
            <ScoreInputBox type="text"/>

            </Box>

            <Box>
            <InfoHeader>대출 받으실 기간(년)</InfoHeader>
            <ScoreInputBox type="text"/>   
            </Box>

            <Box>
            <InfoHeader>나의 신용점수</InfoHeader>
            <ScoreInputBox type="text"/>   
            </Box>

            <Box>
            <InfoHeader>나의 총 자산</InfoHeader>
            <ScoreInputBox type="text"/>    
            </Box>

            <InputButton>입력하기</InputButton>
            <Info>개인 정보는 교육 목적으로 사용할 것으로 <br />저장, 다른 목적으로 사용하지 않습니다.</Info>
        </Container>
    );
};

export default ScoreInput;