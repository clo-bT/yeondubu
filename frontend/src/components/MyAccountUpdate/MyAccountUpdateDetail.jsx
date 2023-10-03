import axios from 'axios';
import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

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

const AccountName = styled.input`
color: #000;
text-align: right;
font-size: 13px;
height: 23px;
width:  100px;
margin-top: 10px;
border: #FF5959;
border-radius: 5px;
padding: 5px; 
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
const NowMoney = styled.input`
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

// const UnlineLine = styled.div`
// width: 35%; 
// height: 1.5px; 
// background-color: #FFD0D0; 
// position: absolute; 
// right: 0; 
// margin-right: 35px;
// `

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

const OutDateDetail = styled.input`
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
const OutMoneyDetail = styled.input`
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
const EndDateDetail = styled.input`
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
const ExpectMoneyDetail = styled.input`
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

const MyAccountUpdateDetail = () => {
  const [accessToken, setAccessToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nowMoney, setnowMoney] = useState('');
  const [expectMoney, setExpectMoney] = useState('');
  const [outDate, setOutDate] = useState('');
  const [outMoney, setoutMoney] = useState('');

  const { accountId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token)
  },[])

  const handleName = (event) => {
    const newName = event.target.value;
    setAccountName(newName);
  };
  const handleEndDate = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
  };
  const handleMoney = (event) => {
    const newMoney = event.target.value;
    setnowMoney(newMoney);
  };
  const handleExpectMoney = (event) => {
    const expectMoney = event.target.value;
    setExpectMoney(expectMoney);
  };
  const handleOutDate = (event) => {
    const outDate = event.target.value;
    setOutDate(outDate);
  };
  const handleOutMoney = (event) => {
    const outMoney = event.target.value;
    setoutMoney(outMoney);
  };


  const SavingAccount = () => {
    console.log(accessToken)
    console.log(accountId)
    const requestBody = {
      account_name: accountName,
      transfer_day: outDate,
      transfer_amount: outMoney,
      final_date: endDate,
      start_amount: nowMoney,
      final_amount: expectMoney
    };
    // 여기서 axios 요청을 보내세요.
    axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/saving/${accountId}`,requestBody, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
  
        },
    })
        .then((response) => {
            console.log('요청 성공:', response);
            console.log(requestBody);
            // alert('계좌가 업데이트되었습니다!');
            navigate(`/myaccountdetail/${accountId}`);
        })
        .catch((error) => {
            console.error('요청 실패:', error);
        });
  };
  
  // const DepositAccount = () => {
  //   console.log(accessToken)
  
  //   const requestBody = {
  //     account_name: accountName,
  //     final_date: endDate,
  //     start_amount: nowMoney,
  //     final_amount: expectMoney
  // }
  //   // 여기서 axios 요청을 보내세요.
  //   axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/deposit/{accountId}`,requestBody, {
  //       headers: {
  //           Authorization: `Bearer ${accessToken}`,
  
  //       },
  //   })
  //       .then((response) => {
  //           console.log('요청 성공:', response);
  //           console.log(requestBody);
  //           alert('계좌가 등록되었습니다!')
  //       })
  //       .catch((error) => {
  //           console.error('요청 실패:', error);
  //       });
  // };
  
    return (
      <>
      <Container>
        <AccountItem>
        <DetailItem>

          <Header>계좌이름</Header>
          <AccountName
          type='text'
          onChange={handleName}
          value={accountName} 
          />
        </DetailItem>
          <DetailItem>

        <Header>현재금액</Header>
          <NowMoney 
          type='number'
          onChange={handleMoney}
          value={nowMoney}/>
          </DetailItem>
            <DetailItem>

              <Header>이체일</Header>
              <OutDateDetail 
              type='number'
              onChange={handleOutDate}
              value={outDate} />
            </DetailItem>
              {/* <UnlineLine /> */}
              
            <DetailItem>
              <Header>이채금액</Header>
              <OutMoneyDetail 
              type='number'
              onChange={handleOutMoney}
              value={outMoney} /> 
            </DetailItem>
            {/* <UnlineLine /> */}

            <DetailItem>
              <Header>만기일</Header>
              <EndDateDetail
              type='text'
              onChange={handleEndDate}
              value={endDate} />

            </DetailItem>
            {/* <UnlineLine /> */}

            <DetailItem>
              <Header>만기예상금액</Header>
              <ExpectMoneyDetail 
              type='number'
              onChange={handleExpectMoney}
              value={expectMoney} />
            </DetailItem>
            {/* <UnlineLine /> */}
        </AccountItem>
    </Container>
      <UpdateButton onClick={SavingAccount}>저장</UpdateButton>
      
      </>
    );
};

export default MyAccountUpdateDetail;