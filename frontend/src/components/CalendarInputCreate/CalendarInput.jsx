import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const InputType = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputTypeIncome = styled.button.attrs(props => ({
  style: {
    color: props.checked ? "#FF937D" : "#000",
    border: props.checked ? "2px solid #FF937D" : "2px solid #D9D9D9",
    fontWeight: props.checked ? "bold" : "normal",
  },
}))`
  height: 38px;
  padding: 7px 15px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
`;

const InputTypeExpend = styled.button.attrs(props => ({
  style: {
    color: props.checked ? "#FF937D" : "#000",
    border: props.checked ? "2px solid #FF937D" : "2px solid #D9D9D9",
    fontWeight: props.checked ? "bold" : "normal",
  },
}))`
  height: 38px;
  padding: 7px 15px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
`;

const InputWho = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputWhoGroom = styled.button.attrs(props => ({
  style: {
    color: props.checked ? "#4F91F4" : "#000",
    border: props.checked ? "2px solid #4F91F4" : "2px solid #D9D9D9",
    fontWeight: props.checked ? "bold" : "normal",
  },
}))`
  width: 87px;
  height: 38px;
  padding: 6px 4px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
`;

const InputWhoBride = styled.button.attrs(props => ({
  style: {
    color: props.checked ? "#FF937D" : "#000",
    border: props.checked ? "2px solid #FF937D" : "2px solid #D9D9D9",
    fontWeight: props.checked ? "bold" : "normal",
  },
}))`
  width: 87px;
  height: 38px;
  padding: 6px 4px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
`;
const InputTag = styled.div``
const InputDate = styled.div``
const InputMoney = styled.div``
const InputMemo = styled.div``
const DateInput = styled.input``
const MoneyInput = styled.input``
const MemoInput = styled.input``
const TagButton = styled.button`
  width: 87px;
  height: 38px;
  padding: 6px 4px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
  border: 2px solid #D9D9D9;
`;

const SaveButton = styled.button`
  cursor: pointer;
`;

const CompleteButton = styled.button`
  cursor: pointer;
`;

const CalendarInput = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const role = localStorage.getItem('role');
    const [role, setRole] = useState('')
    const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [memo, setMemo] = useState('')
    const [tagId, setTagId] = useState(0)
    const handleRole = (who) => {
        setRole(who); 
    };
    const handleType = (type) => {
        setType(type); 
    };
    const handleDate = (event) => {
        setDate(event.target.value);
    };
    const handleAmount = (event) => {
        setAmount(event.target.value);
    };
    const handleMemo = (event) => {
        setMemo(event.target.value);
    };
    const handleTagId = (event) => {
        setTagId(event.target.value);
    };

    const handleSave = () => {
        if (type === 'income') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
        {
            "tag_id":4,
            "user_role": role,
            "date": date,
            "amount":amount,
            "memo": memo,
            
    },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('여기는 캘린더에서 수입 추가하기',response)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        },[]);
        }
        else if (type === 'expenditure') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money`,
        {
            "third_tag_id":1,
            "user_role": role,
            "date": date,
            "amount":amount,
            "memo": memo,
            "pay_complete": false
    },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('여기는 캘린더에서 지출 추가하기',response)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        },[type]);
        };
        
        };
    const handleComplete = () => {
        if (type === 'income') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
        {
            "tag_id":4,
            "user_role": role,
            "date": date,
            "amount":amount,
            "memo": memo,

    },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('여기는 캘린더에서 수입 추가하기',response)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        },[]);
        }
        else if (type === 'expenditure') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money`,
        {
            "third_tag_id":1,
            "user_role": role,
            "date": date,
            "amount":amount,
            "memo": memo,
            "pay_complete": true
    },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('여기는 캘린더에서 지출 추가하기',response)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        },[type]);
        };
        
        };
    
        return (
            <Container>
              <InputType>
              분류
                <InputTypeIncome
                  checked={type === 'income'}
                  onClick={() => handleType('income')}
                >
                  수입
                </InputTypeIncome>
                <InputTypeExpend
                  checked={type === 'expenditure'}
                  onClick={() => handleType('expenditure')}
                >
                  지출
                </InputTypeExpend>
              </InputType>
        
              <InputWho>
              결제
                <InputWhoGroom
                  checked={role === 'GROOM'}
                  onClick={() => handleRole('GROOM')}
                >
                  예비 신랑
                </InputWhoGroom>
                <InputWhoBride
                  checked={role === 'BRIDE'}
                  onClick={() => handleRole('BRIDE')}
                >
                  예비 신부
                </InputWhoBride>
              </InputWho>
        
              <InputTag>
              태그
                <TagButton value={tagId} onChange={handleTagId}>
                  태그
                </TagButton>
              </InputTag>
        
              <InputDate>날짜
                <DateInput type="date" value={date} onChange={handleDate} />
              </InputDate>
        
              <InputMoney>가격
                <MoneyInput type="number" value={amount} onChange={handleAmount} />원
              </InputMoney>
        
              <InputMemo>메모
                <MemoInput type="text" value={memo} onChange={handleMemo} />
              </InputMemo>
        
              <div>
                <SaveButton onClick={()=> navigate('/calendar')}>삭제</SaveButton>
                <SaveButton onClick={handleSave}>저장</SaveButton>
                {type === 'expenditure' && (
                  <CompleteButton onClick={handleComplete}>구매완료</CompleteButton>
                )}
              </div>
            </Container>
          );
};

export default CalendarInput;