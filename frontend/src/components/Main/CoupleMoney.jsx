import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CoupleMoneyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; 
`;

const CashHeader = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: normal;
`
const Cash = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin-top: 0px;
`

// const Box = styled.div`
// display: flex;


// `

const CoupleMoney = () => {
  const [accessToken, setAccessToken] = useState('');
  const [cashMoney, setCashMoney] = useState(0); // 예상 금액 상태 추가
  const [accountMoney, setAccountMoney] = useState(0); // 예상 금액 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/total-cash`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response.data);
          const estimatedMoneyValue = response.data; 
          setCashMoney(estimatedMoneyValue); // 상태를 업데이트
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/total-account`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response.data);
          const estimatedMoneyValue = response.data; 
          setAccountMoney(estimatedMoneyValue); // 상태를 업데이트
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
    }
  }, [accessToken]);

  return (
    <CoupleMoneyContainer>
    <CashHeader>신부 현금</CashHeader>
    <CashHeader>신랑 현금</CashHeader>

    <Cash>{cashMoney.bride_total_cash} 원</Cash>
    <Cash>{cashMoney.groom_total_cash} 원</Cash>

    <CashHeader>신부 예적금</CashHeader>
    <CashHeader>신랑 예적금</CashHeader>
    <Cash>{accountMoney.bride_total_account}원</Cash>
    <Cash>{accountMoney.groom_total_account}원</Cash>


    </CoupleMoneyContainer>
  );
};

export default CoupleMoney;
