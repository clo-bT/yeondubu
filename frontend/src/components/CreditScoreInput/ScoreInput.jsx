import React from 'react';
import styled from 'styled-components';

const ScoreInputBox = styled.input`
width: 254px;
height: 43px;
flex-shrink: 0;
border: 1px solid rgba(0, 0, 0, 0.20);
background: #FFF;
`

const InputButton = styled.button`
display: inline-flex;
width: 150px;
height: 44px;
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
const ScoreInput = () => {
    return (
        <div>
            <ScoreInputBox />
            <InputButton>입력하기</InputButton>

        </div>
    );
};

export default ScoreInput;