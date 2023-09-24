import {React, useState} from 'react';
import styled from 'styled-components';
import { BsFill1CircleFill,BsFill2CircleFill,BsFill3CircleFill,
    BsFill4CircleFill,BsFill5CircleFill,BsFill6CircleFill,BsFill7CircleFill } from "react-icons/bs";


const Container = styled.div`
// display: flex;
// flex-direction: column; 

align-items: center;
// width: 331px;
// height: 515px;
// flex-shrink: 0;

`

const Text = styled.p`
margin-left:10px;
`
const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;


const IconWithText = styled.div`
display: flex;
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
font-family: Pretendard-Regular;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
border: none;
border-radius: 10px;
margin-top: 10px;
`

const CustomCheckbox = styled.input`
  margin-right: 5px;
  &:checked + label::before {
    background-color: #FF5A5A;
    border: 2px solid #FF5A5A;
  }
`;

const InfoInput = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.20);
  outline: none;
  width: 166.003px;
  height: 20px;
  text-align: center;
`

const DepositContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center;
`
const DepositAccountInputForm = () => {
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [showFields, setShowFields] = useState(true); 
  
    const handleAccountTypeChange = (value) => {
      setSelectedAccountType(value);
  

      if (value === '예금') {
        setShowFields(true);
      } else if (value === '적금') {
        setShowFields(true);
      } else if (value === '현금') {
        setShowFields(true); 
      }
    };
  
    return (
        <>
        <Container>
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
          </IconWithText>
    
          {showFields && selectedAccountType === '적금' && (
        <>
          <IconWithText>
            <CountIcon2 />
            <Text>계좌이름</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon3 />
            <Text>만기일</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon4 />
            <Text>현재금액</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon5 />
            <Text>만기예상금액</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon6 />
            <Text>이체일</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon7 />
            <Text>이체금액</Text>
            <InfoInput />
          </IconWithText>
          <InputButton>입력하기</InputButton>
    </>
      )}

        {showFields && selectedAccountType === '예금' && (
        <>
          <IconWithText>
            <CountIcon2 />
            <Text>계좌이름</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon3 />
            <Text>만기일</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon4 />
            <Text>현재금액</Text>
            <InfoInput />
          </IconWithText>

          <IconWithText>
            <CountIcon5 />
            <Text>만기예상금액</Text>
            <InfoInput />
          </IconWithText>
          <InputButton>입력하기</InputButton>
        </>
      )}

        {showFields && selectedAccountType === '현금' && (
        <>
          <IconWithText>
            <CountIcon1 />
            <Text>현재금액</Text>
            <InfoInput />
          </IconWithText>
          <InputButton>입력하기</InputButton>
        </>
      )}
   
    
    </Container>
        {/* <InputButton>입력하기</InputButton> */}
    </>
      );
    };
    

export default DepositAccountInputForm;