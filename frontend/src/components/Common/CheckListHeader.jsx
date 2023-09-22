import React from 'react';
import styled from 'styled-components';

const SaveAtag = styled.a`
display: flex;
flex-direction: column;
align-items: end;
color: #FF6565;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;    
text-decoration: none;
margin-top: 20px;
margin-right: 20px;
`
const CheckHeader = styled.p`
color: #000;
text-align: center;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const CheckDetail = styled.p`
color: #838383;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const CheckIcon = styled.span`
stroke-width: 2px;
color: #FF6565;
`

const HorizonLine = styled.p`
background: #FFD0D0;    
margin-top: 35px;
width: 100%;
height: 1.5px;
`
const CheckListHeader = () => {
    return (
        <div>
            <SaveAtag href="/">적용하기</SaveAtag>
            <CheckHeader>우리 부부를 위한 체크리스트
                <CheckIcon>✔</CheckIcon></CheckHeader>
            <CheckDetail>우리 부부의 결혼식에 필요한 <br />모든 것들을 직접 입력해보세요</CheckDetail>
            <HorizonLine />
        </div>
    );
};

export default CheckListHeader;