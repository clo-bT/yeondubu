import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    background-color: #FFD0D0;
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
`;

const CodeInputBox = styled.div`
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
`;
const Header = styled.div`
    display: flex;
    width: 312px;
    height: 58px;
    flex-direction: column;
    justify-content: center;
`;
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 293px;
    height: 47px;
`;
const NumberInput = styled.input`

    width: 30px;
    height: 30px;
    text-align: center;
    margin: 0 10px;

`;
const InputButton = styled.div`
    width: 197px;
    height: 64px;
    border-radius: 15px;
    background: #F5F5F5;
    color: #FF5A5A;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;

`;
const CreateCode = styled.div`
    color: #FFF;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration-line: underline;
    cursor: pointer;
`;


const CodeInput = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState('')
    const [code, setCode] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        setAccessToken(token)
    },[setAccessToken])
    // const accessToken = sessionStorage.getItem("token");

    const inputRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, '');

        if (numericValue.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
        e.target.value = numericValue;
        const updatedCode = inputRefs.map((ref) => ref.current.value).join('');
        const updatedCodeNumber = parseInt(updatedCode, 10);
        setCode(updatedCodeNumber);

    };
    const sendCodeToBackend = () => {
        console.log(accessToken)
        console.log(code)
        // 여기서 axios 요청을 보내세요.
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/code/${code}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => {
                // 요청 성공 시 처리
                console.log('요청 성공:', response.data.state);
                if (response.data.state === 'success') {
                    navigate(`/checkuser`)
                };
            })
            .catch((error) => {
                // 요청 실패 시 처리
                console.error('요청 실패:', error);
            });
    };


    return (
        <Container>
            <CodeInputBox>
                <Header>
                    약혼자의 코드를 입력해주세요
                </Header>
                <InputContainer>
                    {inputRefs.map((ref, index) => (
                        <NumberInput
                            key={index}
                            type="text"
                            ref={ref}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    ))}
                </InputContainer>
                <InputButton onClick={sendCodeToBackend}>코드 입력</InputButton>
                <CreateCode onClick={() => navigate("/invitepageentercode")}>코드 생성</CreateCode>
            </CodeInputBox>
        </Container>
    );
};

export default CodeInput;