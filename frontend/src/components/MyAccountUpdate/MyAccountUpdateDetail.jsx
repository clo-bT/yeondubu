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
  const [accountData, setAccountData] = useState([]);
  const [accountName, setAccountName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nowMoney, setnowMoney] = useState('');
  const [expectMoney, setExpectMoney] = useState('');
  const [outDate, setOutDate] = useState('');
  const [outMoney, setoutMoney] = useState('');


  const { accountType, accountId} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccessToken(token)
  },[])

  // 전체 계좌 조회
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


  const handleSave = () => {
    // saving account와 deposit account의 request body 구조를 각각 정의합니다.
    const savingRequestBody = {
      account_name: accountName,
      start_amount: nowMoney,
      final_amount: expectMoney,
      transfer_day: outDate,
      transfer_amount: outMoney,
      final_date: endDate
    };

    const depositRequestBody = {
      account_name: accountName,
      start_amount: nowMoney,
      final_amount: expectMoney,
      final_date: endDate
    };

      if (accountType === 'DEPOSIT') {
        console.log('예금들어옴')
        // accountType이 'deposit'인 경우, deposit account용 request body로 PUT 요청을 보냅니다.
        axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/deposit/${accountId}`, depositRequestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response);
          console.log(depositRequestBody);
          navigate(`/myaccountdetail/${accountId}`);
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
      } else if (accountType === 'SAVINGS') {

        // accountType이 'saving'인 경우, saving account용 request body로 PUT 요청을 보냅니다.
        axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/saving/${accountId}`, savingRequestBody, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('요청 성공:', response);
          console.log(savingRequestBody);
          navigate(`/myaccountdetail/${accountId}`);
        })
        .catch((error) => {
          console.error('요청 실패:', error);
        });
      }
    }
  // };


      // account_type에 따라 다른 화면 렌더링
      const renderAccountContent = () => {
        if (accountType === 'DEPOSIT') {
          // Deposit 화면을 렌더링하는 JSX
          return (
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
              <Header>만기일</Header>
              <EndDateDetail
              type='date'
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
          );
        } else if (accountType === 'SAVINGS') {
          // Saving 화면을 렌더링하는 JSX
          return (
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
                  <Header>이체금액</Header>
                  <OutMoneyDetail 
                  type='number'
                  onChange={handleOutMoney}
                  value={outMoney} /> 
                </DetailItem>
                {/* <UnlineLine /> */}
    
                <DetailItem>
                  <Header>만기일</Header>
                  <EndDateDetail
                  type='date'
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
          
          );
        } else {
          // 다른 account_type에 대한 처리
          return (console.log('실패'));
        }
      };
    
  
    return (
      <>
      <Container>
        {renderAccountContent()}
      </Container>
      <UpdateButton onClick={handleSave}>저장</UpdateButton>
      
      </>
    );
};

export default MyAccountUpdateDetail;