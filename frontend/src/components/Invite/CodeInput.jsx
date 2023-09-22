import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
    
`;
const Header = styled.div`
    
`;
const InputContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const CreateCode = styled.div`
    cursor: pointer;
`
const InputButton = styled.div`
    cursor: pointer;

`

const NumberInput = styled.input`

    width: 30px;
    height: 30px;
    text-align: center;
    margin: 0 10px;

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
                console.log('요청 성공:', response);
            })
            .catch((error) => {
                // 요청 실패 시 처리
                console.error('요청 실패:', error);
            });
    };


    return (
        <Container>
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
            <CreateCode onClick={() => navigate("/invite")}>코드 생성</CreateCode>
            
        </Container>
    );
};

export default CodeInput;