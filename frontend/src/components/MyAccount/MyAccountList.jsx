import React from 'react';
import styled from 'styled-components';

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
height: 90px;
border-radius: 10px;
background: rgba(255, 168, 168, 0.20);
margin-bottom:20px;
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
`

const MyAccountList = () => {
    const dummyData = [
        {index: 0, accountname : '우리 청년 적금', money:'50,000,000'},
        {index: 1, accountname : '우리 청년 예금', money:'30,000,000'},

    ]
    return (
        <Container>
            {dummyData.map((item) => (
            <AccountItem key={item.index}>
            <AccountName>{item.accountname}</AccountName>
            <AccountMoney>{item.money} 원</AccountMoney>
            </AccountItem>

            ))}

            <AddAccount href="/">+</AddAccount>
        </Container>
    );
};

export default MyAccountList;