import React from 'react';
import styled from 'styled-components';
import kakao from '../../assets/Login/kakao.svg';


const PageWrapper = styled.div`
height: calc(var(--vh, 1vh) * 100);
background : #FFD0D0; 
/* padding: 315px 24px 335px 24px; */
top: 0;
z-index: 1;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
padding: 0px;

`

const LoginTitle = styled.p`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: #FFF;
font-size: 25px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top:0px;

`

const KakaoLogin = styled.button`
    width: 300px;
    height: 60px;
    color: #000;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-radius: 18px;
    background: #FEE500;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`

const KakaoImg = styled.img`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: -3px;
margin-left: -15px;
height: 25px;
flex-shrink: 0;

`

const FirstMain = () => {
    //REST API KEY
    // const Rest_api_key = process.env.REACT_APP_REST_API_KEY
    // const redirect_uri = `${process.env.REACT_APP_HOME_URL}/auth`
    const backendapi = `${process.env.REACT_APP_API_ROOT}/oauth2/authorization/kakao`
    //Redirect URI to backend
    // oauth 요청 URL
    // const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        // window.location.href = backendapi
        window.location.replace(backendapi)
    }
    return (
        <PageWrapper>
            <LoginTitle>연두부에서  <br/>스마트한 결혼 자금 모으기</LoginTitle>
            <KakaoLogin onClick={handleLogin}><KakaoImg src={kakao} />카카오톡으로 시작하기</KakaoLogin>
        </PageWrapper>
    );
};

export default FirstMain;
