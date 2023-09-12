import React from 'react';
import styled from 'styled-components';

const Start = styled.p`
color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 70px;
`

const AccountInputDetail = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;

font-weight: 400;
line-height: normal;

`
const Wedding = styled.span`
color: #FF6565;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const InputButton = styled.button`
display: inline-flex;
padding: 12px 34px;
justify-content: center;
align-items: center;
gap: 10px;
color: #FF5A5A;
text-align: center;
font-family: Pretendard-Regular;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
border-radius: 10px;
margin-top: 50px;
`

const NextClick = styled.a`
color: #FF5A5A;
text-align: center;
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
display: block; 
margin-top: 10px;
`
const AccountInputMessage = () => {
    return (
        <div>
            <Start>두 사람의 <Wedding>통장 결혼식</Wedding>을 <br /> 이제부터 시작합니다</Start>
            <AccountInputDetail>손예진님의 자산정보를 <br />입력해주세요</AccountInputDetail>
            
            <InputButton>입력하기</InputButton>
            <NextClick href="/">건너뛰기</NextClick>
        </div>
    );
};

export default AccountInputMessage;