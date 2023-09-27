import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    height: 502px;
    border-radius: 15px;
    background: #F5F5F5;
    gap:20px;
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
const UserInfo = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    gap:20px;
    margin-top: 50px;
`
const Name = styled.div`
    color: #F33333;
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const Image = styled.img`
    border-radius: 218px;
`
const CheckDiv = styled.div`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const Timer = styled.div`
color: #080808;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const ButtonGroup = styled.div`
    display:flex;
    flex-direction:column;
    gap : 5px;
`
const WrongButton = styled.div`
    display: flex;
    width: 100px;
    padding: 12px 34px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;
`
const CodeInputSuccess = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("token");
    const partnerName = sessionStorage.getItem('partner_name');
    const partnerImg = sessionStorage.getItem('partner_img');
    const role = sessionStorage.getItem('role');
    function sendCheck() {
        const accessToken = localStorage.getItem("token");
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/check2/${role}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                console.log('요청 성공', response.data);
                if(response.data === 'finish') {
                    navigate('/accountinput')
                }
                else if(response.data === 'cancelled') {
                    sessionStorage.removeItem('partner_id');
                    sessionStorage.removeItem('partner_name');
                    sessionStorage.removeItem('partner_img');
                    navigate('/invite')
                }
            })
            .catch(error => {
                console.error('요청 실패', error);
            });
    }

    //타이머
    const MINUTES_IN_MS = 5 * 60 * 1000 - 1;
    const INTERVAL = 1000;
    const [timeLeft, setTimeLeft] = useState(MINUTES_IN_MS);

    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const second = Math.floor((timeLeft / 1000) % 60);

    useEffect(() => {

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - INTERVAL);
            sendCheck();
        }, INTERVAL);

        if (timeLeft === MINUTES_IN_MS) {
            sendCheck();
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            navigate('/invite')
            console.log('타이머가 종료');
        }

        return () => {
            clearInterval(timer);
        };
    }, [timeLeft, MINUTES_IN_MS, navigate]);
    


    const handleCancel = () => {
        axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/check`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('요청 성공', response);
            sessionStorage.removeItem('partner_id');
            sessionStorage.removeItem('partner_name');
            sessionStorage.removeItem('partner_img');
            navigate('/invite')
        })
        .catch(error => {
            console.error('요청 실패', error);
        });
    };
    return (
        <Container>
                        <CodeBox>
                <Exit>X</Exit>
                <UserInfo>
                    <Name>{partnerName}</Name>
                    <Image src={partnerImg} alt="프로필 이미지" />
                    
                    <CheckDiv>상대방을 기다리는 중...</CheckDiv>
                    <Timer>남은 시간 {minutes} : {second}</Timer>
                    
                        <ButtonGroup>
                            <WrongButton onClick={handleCancel}>취소</WrongButton>
                        </ButtonGroup>
                    
                </UserInfo>
            </CodeBox>
        </Container>
    );
};

export default CodeInputSuccess;