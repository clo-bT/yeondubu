import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 100px;
`;

const AccountItem = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 300px;
  border-radius: 10px;
  background: rgba(255, 168, 168, 0.20);
  margin-bottom: 20px;
`;

const AccountName = styled.p`
  color: #FF5959;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
  margin-top: 10px;
`;

const AccountMoney = styled.p`
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 5px;
`;

const AddAccount = styled.a`
  text-decoration: none;
  padding: 5px 20px;
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background: #EDEEF1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const DeleteButton = styled.span`
// display: flex;
// flex-direction: column;
// align-items: right;

// `

const MyAccountList = () => {
  const [accessToken, setAccessToken] = useState('');
  const [accountData, setAccountData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts`, {
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


  const navigate = useNavigate();

  const navigateToDetailPage = (accountId) => {
    navigate(`/myaccountdetail/${accountId}`);
  };
  

  return (
    <Container>
      {accountData.map((item) => (
        <AccountItem key={item.id} onClick={() => navigateToDetailPage(item.id)}>
          <AccountName>{item.name}</AccountName>
          <AccountMoney>{item.price} 원</AccountMoney>
        </AccountItem>
      ))}
      <AddAccount href="/mypageaccountinput">+</AddAccount>
    </Container>
  );
};

export default MyAccountList;
