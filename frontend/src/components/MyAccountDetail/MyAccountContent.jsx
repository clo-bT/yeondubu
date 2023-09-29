import axios from 'axios';
import {React, useEffect, useState} from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  background-color: rgba(255, 168, 168, 0.20);
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10px;
`;

const AccountItem = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  width:80%;
  margin-top: 10px;
`;

const AccountName = styled.p`
display: flex;
  color: #FF5959;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0;
`;

const DetailItem = styled.div`
display: flex;
justify-content: space-between;
color: #6E7781;
color: #000;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;

`;

const Header = styled.p`
color: #000;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;    
/* margin-bottom: 5px; */
`
const NowMoney = styled.p`
color: #000;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    
display: flex;
`

const Detail = styled.p`
color: #000;
text-align: right;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const UnlineLine = styled.div`
width: 35%; 
height: 1.5px; 
background-color: #FFD0D0; 
position: absolute; /* 절대 위치로 설정 */
right: 0; /* 오른쪽에 위치 */
margin-right: 35px;
`

const UpdateButton = styled.button`
display: flex;
width: 100px;
height: 35px;
padding: 3px 20px;
justify-content: center;
align-items: center;
color: #FF5A5A;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
border: none;
border-radius: 10px;
margin-top: 30px;
margin-left: auto;
margin-right: auto;
`
const MyAccountContent = () => {
  const [accessToken, setAccessToken] = useState('');
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/detail/{accountId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response);
          // console.log(response.data);
          setAccountData(response.data);
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
    }
  }, [accessToken]);
    return (
      <>
      <Container>

        <AccountItem>
          <AccountName>{accountData.account_name}</AccountName>

              <NowMoney>{accountData.start_amount}원</NowMoney>
            <DetailItem>
              <Header>이체</Header>
              <Detail></Detail>
            </DetailItem>
              <UnlineLine />
            <DetailItem>
              <Header>이체금액</Header>
              <Detail> 원</Detail>
            </DetailItem>
            <UnlineLine />
            <DetailItem>
              <Header>만기일</Header>
              <Detail></Detail>
            </DetailItem>
            <UnlineLine />
            <DetailItem>
              <Header>만기예상금액</Header>
              <Detail>원</Detail>
            </DetailItem>
            <UnlineLine />
         
        </AccountItem>

    </Container>
      <UpdateButton>수정하기</UpdateButton>
      
      </>
    );
};

export default MyAccountContent;