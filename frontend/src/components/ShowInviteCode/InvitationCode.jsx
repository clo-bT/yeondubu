import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div``
const CodeDiv = styled.div`
width: 343px;
height: 296px;
`

const InvitationCode = () => {
    const [canGenerateCode, setCanGenerateCode] = useState(true);

    useEffect(() => {
        // const accessToken = JSON.parse(sessionStorage.getItem("token"));
        // const accessToken = sessionStorage.getItem("token");
        const lastGeneratedTime = localStorage.getItem("lastGeneratedTime");
        if (lastGeneratedTime) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(lastGeneratedTime);
            const threeMinutesInMillis = 3 * 60 * 1000; // 3분을 밀리초로 계산
            if (timeDifference < threeMinutesInMillis) {
                setCanGenerateCode(false);
                return;
            }
        }
        const min = 10000;
        const max = 99999;
        const generatedCode = Math.floor(Math.random() * (max - min + 1)) + min;
        localStorage.setItem("lastGeneratedTime", new Date().getTime().toString());
        localStorage.setItem("generatedCode", generatedCode);
        console.log('generatedCode', generatedCode); 
        
        // axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/couple/code/${randomcode}`,null, {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // })
        // .then((response) => {
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     console.error('코드 전송 실패', error);
        // });
    },
        []);

    return (
        <Container>
            <CodeDiv>
                {canGenerateCode ? "코드생성" : "이미 코드를 생성했습니다. 잠시 기다려주세요."}
            </CodeDiv>
        </Container>
    );
};

export default InvitationCode;