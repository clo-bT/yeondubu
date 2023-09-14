import React from 'react';
import styled from 'styled-components';

const CoupleMoneyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 나누기 */
`;

const CoupleMoneyItem = styled.div`
  background-color: #FFF;
  text-align: center;
  padding: 10px;
`;

const CoupleMoney = () => {
  const dummyData = [
    { type: '현금', amount: '5,000,000원' },
    { type: '현금', amount: '5,000,000원' },
    { type: '예적금', amount: '80,000,000원' },
    { type: '예적금', amount: '90,000,000원' },
  ];

  return (
    <CoupleMoneyContainer>
      {dummyData.map((item, index) => (
        <CoupleMoneyItem key={index}>
          <p>{item.type}</p>
          <p>{item.amount}</p>
        </CoupleMoneyItem>
      ))}
    </CoupleMoneyContainer>
  );
};

export default CoupleMoney;
