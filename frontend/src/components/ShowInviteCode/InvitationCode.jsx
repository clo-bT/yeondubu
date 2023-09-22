import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Container = styled.div``
const CodeDiv = styled.div`
width: 343px;
height: 296px;
`
const Exit = styled.div``
const Timer = styled.div``

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
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/code/${code}`, {},{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            console.log(response.data.state);
            // console.log(code)
            
        })
        .catch((error) => {
            console.error('코드 전송 실패', error);
        });
    }
    
    // 타이머
    const MINUTES_IN_MS = 3 * 60 * 1000;
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
    



    return (
        <Container>
            <CodeDiv>
                { code }
            </CodeDiv>
            <Timer>{minutes} : {second}</Timer>
            <Exit onClick={() => navigate("/input")}>닫기</Exit>
        </Container>
    );
};

export default InvitationCode;