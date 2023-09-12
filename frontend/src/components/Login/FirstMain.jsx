import React from 'react';
import styled from 'styled-components';
import kakao from '../../assets/Login/kakao.svg';


const PageWrapper = styled.div`
    height: calc(var(--vh, 1vh) * 100);
    width: 393px;
    background : #FFD0D0; 
    display: inline-flex;
    padding: 315px 24px 335px 24px;
    flex-direction: column;
    align-items: center;
`

const LoginTitle = styled.p`
    color: #FFF;
    text-align: center;
    font-family: Inter;
    font-size: 27px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

`

const KakaoLogin = styled.button`
    width: 345px;
    height: 75px;
    color: #000;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 18px;
    background: #FEE500;
    border: none;
    
`

const KakaoImg = styled.img`
    margin-bottom: -3px;
    margin-left: -15px;
    width: 58px;
    height: 25px;
    flex-shrink: 0;

`

const FirstMain = () => {
    return (
        <PageWrapper>
            <LoginTitle>연두부에서  <br/>스마트한 결혼 자금 모으기</LoginTitle>
            <KakaoLogin><KakaoImg src={kakao} />카카오톡으로 시작하기</KakaoLogin>
        </PageWrapper>
    );
};

export default FirstMain;