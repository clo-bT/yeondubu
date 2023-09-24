import React from 'react';
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

const Detail = styled.input`
color: #000;
text-align: right;
font-size: 13px;
height: 23px;
width:  100px;
margin-top: 10px;
border: #FF5959;
border-radius: 5px;
padding: 5px;
`

const UnlineLine = styled.div`
width: 35%; 
height: 1.5px; 
background-color: #FFD0D0; 
position: absolute; 
right: 0; 
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
const MyAccountUpdateDetail = () => {
    const dummyData = [
        {
        index: 0, 
        name:'우리 청년 적금', 
        money:'50,000,000', 
        이체: '15일',
        이채금액: '500,000', 
        만기일 : '2023-10-23', 
        만기예상금액: '2,000,000'
        }
    ]
    return (
      <>
      <Container>
      {dummyData.map((item) => (
        <AccountItem key={item.index}>
          <AccountName>{item.name}</AccountName>

              <NowMoney>{item.money} 원</NowMoney>
            <DetailItem>
              <Header>이체</Header>
              <Detail type="day" placeholder={item.이체} />
            </DetailItem>
              <UnlineLine />
            <DetailItem>
              <Header>이채금액</Header>
              <Detail type="number" placeholder={item.이채금액} />
            </DetailItem>
            <UnlineLine />
            <DetailItem>
              <Header>만기일</Header>
              <Detail type="date" placeholder={item.만기일} />
            </DetailItem>
            <UnlineLine />
            <DetailItem>
              <Header>만기예상금액</Header>
              <Detail type="number" placeholder={item.만기예상금액} />
            </DetailItem>
            <UnlineLine />
        </AccountItem>
      ))}
    </Container>
      <UpdateButton>저장</UpdateButton>
      
      </>
    );
};

export default MyAccountUpdateDetail;