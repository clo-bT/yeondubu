import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div``
const InputType = styled.div`
display: flex;
align-items: center;
`
const InputTypeIncome = styled.button.attrs(props => ({
    style: {
        color: props.checked ? "#FF937D" : "#000", 
        border: props.checked ? "2px solid #FF937D" : "2px solid #D9D9D9", 
        fontWeight: props.checked ? "bold" : "normal", 
    },
}))`
    height: 38px;
    padding: 7px 15px;
    gap: 10px;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;
`
const InputTypeExpend = styled.button.attrs(props => ({
    style: {
        color: props.checked ? "#FF937D" : "#000", 
        border: props.checked ? "2px solid #FF937D" : "2px solid #D9D9D9", 
        fontWeight: props.checked ? "bold" : "normal", 
    },
}))`
    height: 38px;
    padding: 7px 15px;
    gap: 10px;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;
    `

const InputWho = styled.div`
display: flex;
align-items: center;
`
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
    gap: 10px;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;

`
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
    gap: 10px;
    border-radius: 10px;
    background: #FFF;
    cursor: pointer;

`
const InputSpan = styled.span`
margin-right: 30px;
`
const InputMemo = styled.div`
display: flex;
align-items: center;
`
const InputTag = styled.div`
display: flex;
align-items: center;
`
const InputDate = styled.div`
display: flex;
align-items: center;
`
const DateInput = styled.input``
const MoneyInput = styled.input``
const MemoInput = styled.input``
const TagButton = styled.button`

width: 87px;
height: 38px;
padding: 6px 4px;
gap: 10px;
border-radius: 10px;
background: #FFF;
cursor: pointer;
border: 2px solid #D9D9D9;
`

const InputMoney = styled.div`
display: flex;
align-items: center;
`


const SaveButton = styled.div``

const CalendarInput = () => {
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
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
        {
          "user_role": role,
          "date": date,
          "amount": amount,
          "memo": memo,
          "tag_id": tagId,
        },
        {
          headers: {
              Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            console.log('여기는 캘린더에서 추가하기',response)
        })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    };
    
    return (
        <Container>
             <InputType>
                        <InputSpan>분류 </InputSpan>
                        <InputTypeIncome
                            checked={type === '수입'}
                            onClick={() => handleType('income')}
                        >
                            수입
                        </InputTypeIncome>
                        <InputTypeExpend
                            checked={type === '지출'}
                            onClick={() => handleType('expenditure')}
                        >
                            지출
                        </InputTypeExpend>
                    </InputType>
                    
                    <InputWho><InputSpan>결제 </InputSpan>
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
                        <InputSpan>태그 </InputSpan>
                        <TagButton value={tagId} onChange = {handleTagId}>태그</TagButton>
                    </InputTag>
                    <InputDate>
                        <InputSpan>날짜 </InputSpan> 
                        <DateInput type="date" value={date} onChange={handleDate} />
                    </InputDate>
                    <InputMoney>
                        <InputSpan>가격 </InputSpan> 
                        <MoneyInput type="number" value={amount} onChange={handleAmount} />원
                    </InputMoney>
                    <InputMemo>
                        <InputSpan>메모 </InputSpan>
                        <MemoInput type="text" value={memo} onChange={handleMemo} />
                    </InputMemo>
               
            <SaveButton onClick={handleSave}>저장</SaveButton>
        </Container>
    );
};

export default CalendarInput;