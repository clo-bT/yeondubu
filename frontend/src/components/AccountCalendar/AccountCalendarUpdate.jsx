import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 20px; 
margin-top : 20px;
  text-align: left;

`;

const Box = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
margin-left:20px;
gap:20px;


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

display:flex;


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
  font-size:16px;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px 0px;
width:222px;
`
const MoneyInput = styled.input`
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px;
font-size:16px;
`
const MemoInput = styled.input`
font-size:16px;
border-radius: 10px;
border: 1px solid #D9D9D9;
background: #FFF;
padding:6px;
`
const TagSelect = styled.select`
display: inline-flex;
color: #000;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;

text-transform: uppercase;
  height: 38px;
  padding: 6px 4px;
  border-radius: 10px;
  background: #FFF;
  cursor: pointer;
  border: 2px solid #D9D9D9;
`;

const TagBox = styled.div`
  display:flex;
  flex-direction:column;
`

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

const CompleteButton = styled.button`
color: #FFF;
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;
  cursor: pointer;
  display: flex;
width: 80px;
height: 45px;
padding: 3px 8px;
justify-content: center;
align-items: center;
border-radius: 10px;
background: rgba(255, 101, 101, 0.80);
border: none;
`;

const ButtonBox = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap: 20px;
margin-top: 70px;
`
const BoxHeader = styled.span`
margin-right: 10px;
`
const Exit = styled.button`
border: none;
`


const CalendarInput = () => {
  const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const role = localStorage.getItem('role');
    const [role, setRole] = useState('')
    // const [type, setType] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [memo, setMemo] = useState('')
    const [tagName, setTagName] = useState('')
    const [expenditureId, setExpenditureId] = useState(0)
    const { tagId } = useParams();
    // const [expenditureData, setExpenditureData] = useState({
    //     expenditure_id: 1,
    //     user_role: "BRIDE",
    //     date: "2024-05-16",
    //     amount: 100000,
    //     memo: "구매한 침대",
    //     pay_complete: true
    // });

    // const [updatedData, setUpdatedData] = useState({ ...expenditureData }); // 초기값 설정
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${tagId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            // setExpenditureData(response.data);
            // 기본값 설정
            // setUpdatedData({
            //     user_role: response.data.user_role || '',
            //     date: response.data.date || '',
            //     amount: response.data.amount || 0,
            //     memo: response.data.memo || ''
            // });
            // setExpenditureData(response.data);
            console.log(response.data);
            setRole(response.data.user_role);
            // setType(response.data.type);
            setAmount(response.data.amount);
            setExpenditureId(response.data.expenditure_id);
            setMemo(response.data.memo);
            setDate(response.data.date);
            setTagName(response.data.third_tag_name);
            // 기본값 설정
            // setUpdatedData(response.data);
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
      axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/${expenditureId}`,{
        headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
      }).then((response) => {
        console.log('여기는 삭제',response);
        navigate(-1)
      }).catch((error) => {
        console.error('여기는 삭제',error)
      })
    };
    const handleSave = () => {
    //     if (type === 'income') {
    //         axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
    //     {
    //         "tag_id":tagId,
    //         "user_role": role,
    //         "date": date,
    //         "amount":amount,
    //         "memo": memo,
            
    // },
    //     {
    //       headers: {
    //           Authorization: `Bearer ${accessToken}`,
    //         }
    //     }).then(response => {
    //         console.log('Update에서 수입 수정(저장)',response)
    //     })
    //     .catch(error => {
    //         console.error('Update에서 수입 수정(저장)', error);
    //     },[]);
    //     }
    //     else if (type === 'expenditure') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money`,
        {
            "third_tag_id":expenditureId,
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
          console.log('Update에서 지출 수정(저장)', response);
          navigate(-1)
          // console.log(updatedData)
        })
        .catch(error => {
            console.error('Update에서 지출 수정(저장)', error);
        },);
        };
      // }
        
    const handleComplete = () => {
    //     if (type === 'income') {
    //         axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
    //     {
    //         "tag_id": tagId,
    //         "user_role": role,
    //         "date": date,
    //         "amount":amount,
    //         "memo": memo,

    // },
    //     {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         }
    //     }).then(response => {
    //         console.log('여기는 캘린더에서 수입 추가하기',response)
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     },[]);
    //     }
    //     else if (type === 'expenditure') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money`,
        {
            "third_tag_id":expenditureId,
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
            console.log('update에서 지출 수정(구매완료)',response);
            navigate(-1);
        })
        .catch(error => {
            console.error('update에서 지출 수정(구매완료)', error);
        },[]);
        };
        
        // };
    
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
              <TagBox>
              <TagSelect>
                <option value="">{tagName}</option>
                    
                </TagSelect>
              </TagBox>
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
              {/* {type === 'expenditure' && ( */}
                <CompleteButton onClick={handleComplete}>구매완료</CompleteButton>
              {/* )} */}
              </ButtonBox>
              </div>
            </Container>
          );
};

export default CalendarInput;