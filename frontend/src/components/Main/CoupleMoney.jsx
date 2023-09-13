import React from 'react';
import styled from 'styled-components';

const CoupleMoneyContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2열로 나누기 */

`;

const CoupleMoneyItem = styled.div`
  background-color: #FFF;
  padding: 10px;
  text-align: center;
`;

const CoupleMoney = () => {
    return (
        <CoupleMoneyContainer>
        <CoupleMoneyItem>
          <p>현금</p>
          <p>5,000,000원</p>
        </CoupleMoneyItem>
        <CoupleMoneyItem>
          <p>현금</p>
          <p>5,000,000원</p>
        </CoupleMoneyItem>
        <CoupleMoneyItem>
          <p>예적금</p>
          <p>80,000,000원</p>
        </CoupleMoneyItem>
        <CoupleMoneyItem>
          <p>예적금</p>
          <p>90,000,000원</p>
        </CoupleMoneyItem>
      </CoupleMoneyContainer>
    );
};

export default CoupleMoney;