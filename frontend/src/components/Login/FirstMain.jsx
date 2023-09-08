import React from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
    background : #FFD0D0; 
    display: inline-flex;
    height: 852px;
    padding: 315px 24px 335px 24px;
    flex-direction: column;
    align-items: center;
`

const LoginTitle = styled.p`
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

`
const FirstMain = () => {
    return (
        <PageWrapper>
            <LoginTitle>연두부에서 스마트한 결혼 자금 모으기</LoginTitle>

        </PageWrapper>
    );
};

export default FirstMain;