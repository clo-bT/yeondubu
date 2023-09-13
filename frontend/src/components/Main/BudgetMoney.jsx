import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
height: ${({ isBudgetOpen }) => (isBudgetOpen ? '516px' : '230px')};
background: #FFD0D0;
flex-direction: column;
align-items: center;
justify-content: center;
position: sticky;
top: 0;
z-index: 1;
transition: height 0.3s;
overflow: hidden;
`

const Dday = styled.p`
color: #FFF;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 800;
line-height: normal;
margin: 0px;
padding-top: 50px;
`

const EstimatedMoney = styled.p`
color: #FFF;
font-size: 25px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin: 20px;
`

const EstimatedMoneyDetail = styled.p`
color: #FFF;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin: 10px;
`

const WeHave = styled.p`
color: #FFF;
font-size: 23px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 70px;
`

const WeHaveDetail = styled.p`
color: #F5F5F5;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin: 20px;
`

const WeNeed = styled.p`
color: #FFF;
font-size: 23px;
font-style: normal;
font-weight: 400;
line-height: normal;
`

const WeNeedDetail = styled.p`
color: #F5F5F5;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
font-size: 30px;
font-style: normal;
font-weight: 500;
line-height: normal;
margin: 20px;
`
const BudgetMoney = ({ isBudgetOpen }) => {


    return (
        <Container isBudgetOpen={isBudgetOpen}>
            <Dday>D-527</Dday>
            <EstimatedMoney>총 예상 금액</EstimatedMoney>
            <EstimatedMoneyDetail>370,000,000원</EstimatedMoneyDetail>
            <WeHave>함께 이만큼 모았어요</WeHave>
            <WeHaveDetail>170,000,000원</WeHaveDetail>
            <WeNeed>앞으로 이만큼 남았어요</WeNeed>
            <WeNeedDetail>200,000,000원</WeNeedDetail>
        </Container>
    );
};

export default BudgetMoney;