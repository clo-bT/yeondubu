import {React, useState, useEffect} from 'react';
import styled from 'styled-components';
import { BsFill1CircleFill,BsFill2CircleFill,BsFill3CircleFill,
    BsFill4CircleFill,BsFill5CircleFill,BsFill6CircleFill,BsFill7CircleFill } from "react-icons/bs";
import axios from 'axios';
import Swal from "sweetalert2";

const Container = styled.div`
display: flex;
flex-direction: column; 
margin-top: 40px;
align-items: center;



`

const Text = styled.p`
margin-left:10px;
display: flex;
flex-direction: column;
align-items: center;
`
const CheckBoxContainer = styled.div`
  display: flex;
  
  align-items: center;
  margin-left: 20px;
`;


const IconWithText = styled.div`
display: flex;
/* flex-direction: column; */
align-items: center;
margin-bottom: 20px;

`;

const CountIcon1 = styled(BsFill1CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;
`
const CountIcon2 = styled(BsFill2CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`
const CountIcon3 = styled(BsFill3CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`
const CountIcon4 = styled(BsFill4CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`
const CountIcon5 = styled(BsFill5CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`
const CountIcon6 = styled(BsFill6CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`
const CountIcon7 = styled(BsFill7CircleFill)`
color: #FFD0D0;
width: 27px;
height: 27px;
flex-shrink: 0;

`

const InputButton = styled.button`
display: inline-flex;
width: 150px;
height: 44px;
padding: 12px 34px;
justify-content: center;
align-items: center;
gap: 10px;
color: #FF5A5A;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
border-radius: 10px;
/* margin-top: 10px; */
margin-bottom: 10px;
margin-top: 10px;
`

const CustomCheckbox = styled.input`
  margin-right: 5px;
  &:checked + label::before {
    background-color: #FF5A5A;
    border: 2px solid #FF5A5A;
  }
`;

const AccountNameInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`

const NowMoneyInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const ExpectMoneyInput = styled.input`
    border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`

const OutDateInput = styled.input`
    border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;

`
const OutMoneyInput = styled.input`
    border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const EndDateInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const DepositAccountNameInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const DepositEndDateInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const DepositNowMoneyInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const DepositExpectMoney = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`
const Box = styled.div`
justify-content: space-between;
`
const CashNowMoneyInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;

`
const DepositAccountInputForm = () => {
  // const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(''); 
  const [accessToken, setAccessToken] = useState('');
  const [accountName, setAccountName] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nowMoney, setnowMoney] = useState('');
  const [expectMoney, setExpectMoney] = useState('');
  const [outDate, setOutDate] = useState('');
  const [outMoney, setoutMoney] = useState('');
  const [cashMoney, setcashMoney] = useState('');
  
  const resetFields = () => {
    setAccountName('');
    setEndDate('');
    setnowMoney('');
    setExpectMoney('');
    setOutDate('');
    setoutMoney('');
    setcashMoney('');
  };

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
const handleCash = (event) => {
  const CashMoney = event.target.value;
  setcashMoney(CashMoney);
};

  
const SavingAccount = () => {
  if (!accountName || !endDate || !nowMoney || !expectMoney || !outDate || !outMoney) {
    setErrorMessage('모든 입력란을 채워주세요.'); // 에러 메시지 설정
    return;
  }
  console.log(accessToken)

  const requestBody = {
    account_name: accountName,
    transfer_day: outDate,
    transfer_amount: outMoney,
    final_date: endDate,
    start_amount: nowMoney,
    final_amount: expectMoney
  };
  // 여기서 axios 요청을 보내세요.
  axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/saving`,requestBody, {
      headers: {
          Authorization: `Bearer ${accessToken}`,

      },
  })
      .then((response) => {
          console.log('요청 성공:', response);
          console.log(requestBody);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: '적금계좌가 등록되었습니다!'
          })
   
        
    })
     
      .catch((error) => {
          console.error('요청 실패:', error);
      });
      setErrorMessage('');
      resetFields();
};

const DepositAccount = () => {
  if (!accountName || !endDate || !nowMoney || !expectMoney) {
    setErrorMessage('모든 입력란을 채워주세요.'); // 에러 메시지 설정
    return;
  }
  console.log(accessToken)

  const requestBody = {
    account_name: accountName,
    final_date: endDate,
    start_amount: nowMoney,
    final_amount: expectMoney
}
  // 여기서 axios 요청을 보내세요.
  axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/accounts/deposit`,requestBody, {
      headers: {
          Authorization: `Bearer ${accessToken}`,

      },
  })
      .then((response) => {
          console.log('요청 성공:', response);
          console.log(requestBody);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: '예금계좌가 등록되었습니다!'
          })
      })
      .catch((error) => {
          console.error('요청 실패:', error);
      });
      
      setErrorMessage('');
      resetFields();
    };
    
const CashAccount = () => {
  if (!cashMoney) {
    setErrorMessage('모든 입력란을 채워주세요.'); // 에러 메시지 설정
    return;
  }

  console.log(accessToken)

  const requestBody = {
    "total_cash": cashMoney
}
  // 여기서 axios 요청을 보내세요.
  axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/money/cash`,requestBody, {
      headers: {
          Authorization: `Bearer ${accessToken}`,

      },
  })
      .then((response) => {
          console.log('요청 성공:', response);
          console.log(requestBody);
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
          })
          
          Toast.fire({
            icon: 'success',
            title: '현금이 등록되었습니다!'
          })
      })
      .catch((error) => {
          console.error('요청 실패:', error);
      });
      setErrorMessage('');
      resetFields();
};




    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [showFields, setShowFields] = useState(true); 
  
    const handleAccountTypeChange = (value) => {
      setSelectedAccountType(value);
  

      if (value === '예금' || value === '적금' || value === '현금') {
        setShowFields(true);
      } else {
        setShowFields(false);
      }
    };
  
    return (
        <Container>
  
            <Box>
          <IconWithText>
            <CountIcon1 />
            <Text>계좌</Text>
            <CheckBoxContainer>
              <CustomCheckbox
                type="checkbox"
                id="예금"
                checked={selectedAccountType === '예금'}
                onChange={() => handleAccountTypeChange('예금')}
              />

              <Text>예금</Text>
            </CheckBoxContainer>
            <CheckBoxContainer>
              <CustomCheckbox
                type="checkbox"
                id="적금"
                checked={selectedAccountType === '적금'}
                onChange={() => handleAccountTypeChange('적금')}
              />

              <Text>적금</Text>
            </CheckBoxContainer>
            <CheckBoxContainer>
              <CustomCheckbox
                type="checkbox"
                id="현금"
                checked={selectedAccountType === '현금'}
                onChange={() => handleAccountTypeChange('현금')}
              />

              <Text>현금</Text>
            </CheckBoxContainer>
          {/* </Box> */}

          </IconWithText>
          {showFields && selectedAccountType === '적금' && (
        <Box>
          <IconWithText>
            <CountIcon2 />
            <Text>계좌이름</Text>
            <AccountNameInput 
              type='text'
              onChange={handleName}
              value={accountName}
            />
          </IconWithText>

          <IconWithText>
            <CountIcon3 />
            <Text>만기일</Text>
            <EndDateInput 
            type='date'
            onChange={handleEndDate}
            value={endDate}
            />
          </IconWithText>

          <IconWithText>
            <CountIcon4 />
            <Text>현재금액</Text>
            <NowMoneyInput 
            type="number"
            onChange={handleMoney}
            value={nowMoney}
            />
          </IconWithText>

          <IconWithText>
            <CountIcon5 />
            <Text>만기예상금액</Text>
            <ExpectMoneyInput 
            type="number"
            onChange={handleExpectMoney}
            value={expectMoney}
            />
          </IconWithText>

          <IconWithText>
            <CountIcon6 />
            <Text>이체일</Text>
            <OutDateInput 
            type="number"
            onChange={handleOutDate}
            value={outDate}
            />
          </IconWithText>

          <IconWithText>
            <CountIcon7 />
            <Text>이체금액</Text>
            <OutMoneyInput 
            type="number"
            onChange={handleOutMoney}
            value={outMoney}
            />
          </IconWithText>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* 에러 메시지 표시 */}
          <InputButton onClick={SavingAccount}>입력하기</InputButton>
    </Box>
      )}

        {showFields && selectedAccountType === '예금' && (
        <Box>
          <IconWithText>
            <CountIcon2 />
            <Text>계좌이름</Text>
            <DepositAccountNameInput
            type='text'
            onChange={handleName}
            value={accountName}/>
          </IconWithText>

          <IconWithText>
            <CountIcon4 />
            <Text>현재금액</Text>
            <DepositNowMoneyInput 
            type="number"
            onChange={handleMoney}
            value={nowMoney}
            />
          </IconWithText>
          
          <IconWithText>
            <CountIcon3 />
            <Text>만기일</Text>
            <DepositEndDateInput 
            type="date"
            onChange={handleEndDate}
            value={endDate}
            />
          </IconWithText>


          <IconWithText>
            <CountIcon5 />
            <Text>만기예상금액</Text>
            <DepositExpectMoney 
            type="number"
            onChange={handleExpectMoney}
            value={expectMoney}
            />
          </IconWithText>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* 에러 메시지 표시 */}
          <InputButton onClick={DepositAccount}>입력하기</InputButton>
        </Box>
      )}

        {showFields && selectedAccountType === '현금' && (
        <Box>
          <IconWithText>
            <CountIcon2 />
            <Text>현재금액</Text>
            <CashNowMoneyInput 
            type="number"
            onChange={handleCash}
            value={cashMoney}
            />
          </IconWithText>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* 에러 메시지 표시 */}
          <InputButton onClick={CashAccount}>입력하기</InputButton>

        </Box>
      )}

   

        {/* <InputButton onClick={SavingAccount}>입력하기</InputButton> */}
        </Box>
    </Container>
      );
    };
    

export default DepositAccountInputForm;