import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { AiOutlineInfoCircle } from "react-icons/ai";
import UserWithdraw from '../../pages/UserWithdraw';
import axios from 'axios';


const GoBack = styled.a`
text-decoration: none;
color: #000;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;
display: flex;
align-items: center; 
margin: 20px;
`
const Content = styled.div`
display: flex;
flex-direction: column;
align-items: start;
margin-left: 35px;
margin-right: 35px;
margin-top: 40px;
gap: 15px;
`

const InfoIcon = styled(AiOutlineInfoCircle)`
margin-top: 50px;
height: 60px;
width: 60px;
color :#F33333;
margin-bottom: 10px;
`

const BrokeUpButton = styled.button`
display: flex;
width: 100px;
height: 35px;
padding: 3px 20px;
justify-content: center;
align-items: center;
color: #FF5A5A;
text-align: center;
font-size: 15px;
font-weight: 700;
border: none;
border-radius: 10px;
margin-top: 40px;
margin-left: auto;
margin-right: auto;
`

const UserWithdrawInfo = () => {
    const [accessToken, setAccessToken] = useState('');
  
    useEffect(() => {
      const token = sessionStorage.getItem("token");
      setAccessToken(token);
    }, []);

    const UserWithdraw = () => {
        console.log(accessToken)
      

        // 여기서 axios 요청을 보내세요.
        axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/couples`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
      
            },
        })
            .then((response) => {
                console.log('요청 성공:', response);

            })
            .catch((error) => {
                console.error('요청 실패:', error);
            });
      };
    return (
        <div>
        <GoBack href="/mypage" >뒤로가기</GoBack> 
        <InfoIcon />
            <p>상대방과 연결을 끊기 전에 꼭 확인해주세요!</p>
        <Content>
            <li>나와 상대방의 연결이 끊어지면 두 분이 업로드한 모든 자료의 열람이 차단됩니다.</li>
            <li> 연두부에 저장되어 있는 두 분의 모든 자료 및 데이터는 영구적으로 삭제되며, 삭제 후 복구가 불가합니다.</li>
            <li>연결 끊기 시 부디 신중하게 선택해 주시기 바랍니다.</li>
        </Content>

        <BrokeUpButton onClick={UserWithdraw}>파혼하기</BrokeUpButton>
        </div>
    );
};

export default UserWithdrawInfo;