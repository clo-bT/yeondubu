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

const InvitationCode = () => {
    const navigate = useNavigate();

    const [canGenerateCode, setCanGenerateCode] = useState(true);
    const [code, setCode] = useState(true);

    useEffect(() => {
        // const accessToken = JSON.parse(sessionStorage.getItem("token"));
        const accessToken = sessionStorage.getItem("token");
        const lastGeneratedTime = localStorage.getItem("lastGeneratedTime");
        const min = 10000;
        const max = 99999;
        const generatedCode = Math.floor(Math.random() * (max - min + 1)) + min;
        localStorage.setItem("lastGeneratedTime", new Date().getTime().toString());
        localStorage.setItem("generatedCode", generatedCode);
        console.log('generatedCode', generatedCode); 

        if (canGenerateCode) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(lastGeneratedTime);
            const threeMinutesInMillis = 3 * 60 * 1000; // 3분을 밀리초로 계산
            if (timeDifference < threeMinutesInMillis) {
                setCanGenerateCode(false);
                setCode(generatedCode)
                return;
            }
        }

        
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/code/${generatedCode}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error('코드 전송 실패', error);
        });
    },[canGenerateCode]);

    return (
        <Container>
            <CodeDiv>
                { code }
            </CodeDiv>
            <Exit onClick={() => navigate("/input")}>닫기</Exit>
        </Container>
    );
};

export default InvitationCode;