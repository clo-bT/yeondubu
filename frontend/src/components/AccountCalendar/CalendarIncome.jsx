import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
margin-top : 20px;
  text-align: left;

`;

const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left:20px;


`
const Title = styled.div`
color: rgba(0, 0, 0, 0.80);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
display:inline-flex;
margin-right: 30px;
`
const InputType = styled.div`

  margin-right: 10px;

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
  color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
margin-right:10px;
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
  color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;

`;

const InputWho = styled.div`


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
  color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
margin-right:10px;
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
  color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
`;
const InputTag = styled.div`

width:30px;

`
const InputDate = styled.div`

`

const InputMoney = styled.div`
align-items: left;

`
const InputMemo = styled.div`
/* display:flex;
align-items: left; */
`
const DateInput = styled.input`
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px;
`
const MoneyInput = styled.input`
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px;
`
const MemoInput = styled.input`
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px;
`
const TagSelect = styled.select`
color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;
  width: 87px;
  height: 38px;
  padding: 6px 4px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
  border: 2px solid #D9D9D9;
`;

const SaveButton = styled.button`
display: flex;
width: 80px;
height: 45px;
padding: 3px 20px;
justify-content: center;
align-items: center;
color: #FF5A5A;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
  cursor: pointer;
  border: none;
  border-radius: 10px;
`;



const ButtonBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
`
const BoxHeader = styled.span`
margin-right: 10px;
`
const Exit = styled.button`
border: none;
`

const CalendarIncome = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const role = localStorage.getItem('role');
    const [role, setRole] = useState('')
    // const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [memo, setMemo] = useState('')
    const [tagName, setTagName] = useState('')
    const { tagId } = useParams();
   

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/income/${tagId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            console.log(response.data);
            setRole(response.data.user_role);
            // setType(response.data.type);
            setAmount(response.data.amount);
            setMemo(response.data.memo);
            setDate(response.data.date);
            setTagName(response.data.tag_name);
            // 기본값 설정
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [tagId, accessToken]);

    const handleRole = (who) => {
        setRole(who); 
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
    const handleDelete = () => {
      axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/income/${tagId}`,{
        headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
      }).then((response) => {
        console.log('여기는 삭제',response);
        navigate('/calendar')
      }).catch((error) => {
        console.error('여기는 삭제',error)
      })
    };
    const handleSave = () => {
    //     if (type === 'income') {
            axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
        {
            "tag_id":tagId,
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
            console.log('Update에서 수입 수정(저장)',response)
        navigate('/calendar')

        })
        .catch(error => {
            console.error('Update에서 수입 수정(저장)', error);
        },[]);
        }

        return (
            <Container>
              <Exit onClick={()=>navigate(-1)}>X</Exit>
            <Box>
              <InputType>
              <Title>분류</Title>
                <InputTypeIncome
                  
                >
                  수입
                </InputTypeIncome>
     
                <InputTypeExpend
                  checked={true}
                >
                  지출
                </InputTypeExpend>
              </InputType>
        
              <InputWho>
              <Title>결제</Title>
              <BoxHeader>
              
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
              </BoxHeader>
              </InputWho>
        
              <InputTag>
                <Title>태그 </Title>
                <TagSelect>
                <option value="">{tagName}</option>
                    
                </TagSelect>
    </InputTag>
        
              <InputDate>
              <Title>날짜</Title>
                <DateInput type="date" value={date} onChange={handleDate} />
              </InputDate>
        
              <InputMoney>
              <Title>가격</Title>
                <MoneyInput type="number" value={amount} onChange={handleAmount} />원
              </InputMoney>
        
              <InputMemo>
              <Title>메모</Title>
                <MemoInput type="text" value={memo} onChange={handleMemo} />
              </InputMemo>
              </Box>
              <div>

              <ButtonBox>
              
              <SaveButton onClick={handleDelete}>삭제</SaveButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
              
              </ButtonBox>
              </div>
            </Container>
          );
};

export default CalendarIncome;