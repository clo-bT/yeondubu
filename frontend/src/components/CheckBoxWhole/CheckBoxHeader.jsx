import React from 'react';
import styled from 'styled-components';

const CheckHeader = styled.p`
color: #000;
text-align: center;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const CheckIcon = styled.span`
stroke-width: 2px;
color: #FF6565;
`

const CheckBoxHeader = () => {
    return (
        <div>
        <CheckHeader>우리 부부를 위한 체크리스트
        <CheckIcon>✔</CheckIcon></CheckHeader>
        </div>
    );
};

export default CheckBoxHeader;