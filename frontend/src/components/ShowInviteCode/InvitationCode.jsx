import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
    background-color: #FFD0D0;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`
const CodeBox = styled.div`
width: 343px;
height: 296px;
border-radius: 15px;
background: #F5F5F5;

`
const Exit = styled.p`
display: flex;
flex-direction: column;
align-items: end;
font-size: 22px;
cursor: pointer;
margin-right: 20px;
margin-bottom: 0px;
`
const CodeBoxBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 28px;
`
const InVite = styled.div`
color: #FF5A5A;
text-align: center;
font-size: 36px;
font-style: normal;
font-weight: 400;
line-height: normal;
`


const CodeDiv = styled.div`
color: rgba(0, 0, 0, 0.80);
text-align: center;
font-size: 42px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const Reload = styled.div`
color: #FF5A5A;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
cursor: pointer;
`
const Timer = styled.div`
color: #080808;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const InvitationCode = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    
    function generateRandomCode() {
        const min = 10000; 
        const max = 99999; 
        const randomCode = Math.floor(Math.random() * (max - min + 1)) + min;
        setCode(randomCode)
        return randomCode;
    }
    function sendRandomCode() {
        const accessToken = sessionStorage.getItem("token");
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/code/${code}`, {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            console.log(response.data.state);
            // console.log(code)
            // 코드 생성이야. 이 사람이 host
            if (response.data.state === 'finish') {
                localStorage.setItem('partner_id', response.data.partner_id);
                localStorage.setItem('partner_name', response.data.partner_name);
                localStorage.setItem('partner_img', response.data.partner_img);
                localStorage.setItem('role', 'host');
                navigate(`/checkuser`)
            };
        })
        .catch((error) => {
            console.error('코드 전송 실패', error);
        });
    }
    
    // 타이머
    const MINUTES_IN_MS = 3 * 60 * 1000 - 1;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState(MINUTES_IN_MS);

    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const second = Math.floor((timeLeft / 1000) % 60);

    useEffect(() => {

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
            sendRandomCode();
        }, INTERVAL);

        if (timeLeft === MINUTES_IN_MS) {
            generateRandomCode();
            sendRandomCode();
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            setTimeLeft(MINUTES_IN_MS);
            generateRandomCode();
            console.log('타이머가 종료, 인증코드 재생성.');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft, MINUTES_IN_MS]);
    

    function handleReloadButtonClick() {
        window.location.reload();
      }

    return (
        <Container>
            <CodeBox>
                <Exit onClick={() => navigate("/invite")}>X</Exit>
                <CodeBoxBox>
                    <InVite>초대 코드</InVite>
                    <CodeDiv>{ code }</CodeDiv>
                    <Timer>남은 시간 {minutes} : {second}</Timer>
                    <Reload onClick={handleReloadButtonClick}>코드 재생성하기</Reload>
                </CodeBoxBox>
            </CodeBox>
        </Container>
    );
};

export default InvitationCode;