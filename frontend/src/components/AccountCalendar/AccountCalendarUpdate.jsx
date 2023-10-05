import React, { useState, useEffect } from 'react';
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
const Title = styled.p`
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
const InputType = styled.p`

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

const InputWho = styled.p`


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
const InputTag = styled.p`



`
const InputDate = styled.p`

`

const InputMoney = styled.p`
align-items: left;

`
const InputMemo = styled.p`
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
`
const BoxHeader = styled.span`
margin-right: 10px;
`

const CalendarInput = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const role = localStorage.getItem('role');
    const [incomeTags, setIncomeTags] = useState([]);
    const [expendTags, setExpendTags] = useState([]);
    const [role, setRole] = useState('')
    const [type, setType] = useState('expenditure')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState(0)
    const [memo, setMemo] = useState('')
    const [TagId, setTagId] = useState(0)
    const { tagId } = useParams();
    const [expenditureData, setExpenditureData] = useState({
        expenditure_id: 1,
        user_role: "BRIDE",
        date: "2024-05-16",
        amount: 100000,
        memo: "구매한 침대",
        pay_complete: true
    });

    const [updatedData, setUpdatedData] = useState({ ...expenditureData }); // 초기값 설정
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${tagId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            setExpenditureData(response.data);
            // 기본값 설정
            setUpdatedData({
                user_role: response.data.user_role || '',
                date: response.data.date || '',
                amount: response.data.amount || 0,
                memo: response.data.memo || ''
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [tagId, accessToken]);

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

    useEffect(() => {
        // API 요청을 보내고 응답 데이터를 expenditureData 상태로 설정
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${tagId}`,{
            headers:{
              Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                console.log('데이터 정보',response.data)
                setExpenditureData(response.data);
                setRole(response.data.user_role);
                setAmount(response.data.amount);
                setTagId(response.data.expenditure_id);
                setMemo(response.data.memo);
                setDate(response.data.date);
                // 기본값 설정
                setUpdatedData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [tagId, accessToken]);

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/income/tag`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
            })
        .then(response => {
            console.log('income 태그 받기',response.data)
          setIncomeTags(response.data); // 서버 응답에서 태그 데이터 설정
        })
        .catch(error => {
          console.error('income 태그 받기', error);
        });
    },[accessToken])
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/all`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
            })
        .then(response => {
            console.log('지출 태그 받기',response.data)
            setExpendTags(response.data); // 서버 응답에서 태그 데이터 설정
        })
        .catch(error => {
          console.error('지출 태그 받기', error);
        });
    },[accessToken])
    
    const handleThirdTagChange = (event) => {
        const selectedThirdTagId = event.target.value;
        setTagId(selectedThirdTagId);
    };
    const handleSave = () => {
        if (type === 'income') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/income`,
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
            console.log('여기는 캘린더에서 수입 추가하기',response)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        },[]);
        }
        else if (type === 'expenditure') {
            axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money`,
        {
            "third_tag_id":tagId,
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
            "tag_id": tagId,
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
            "third_tag_id":tagId,
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
            console.error('여기는 캘린더에서 지출 추가하기', error);
        },[type]);
        };
        
        };
    
        return (
            <Container>
            <Box>
              <InputType>
              <Title>분류</Title>
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
                <TagSelect onChange={handleThirdTagChange}>
                    <option value="">태그를 선택하세요</option>
                    
                    {type === 'income'
                    ? incomeTags.map(tag => (
                        <option key={tag.id} value={tag.id}>
                            {tag.tag_name}
                        </option>
                        ))
                    : expendTags.map(firstTag => (
                        firstTag.tag_second_expenditure_dto_list.map(secondTag => (
                        secondTag.tag_third_expenditure_dto_list.map(thirdTag => (
                            <option key={thirdTag.third_tag_id} value={thirdTag.third_tag_id}>
                            {thirdTag.third_tag_name}
                            </option>
                        ))
                        ))
                    ))}
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
              
              <SaveButton onClick={()=> navigate('/calendar')}>삭제</SaveButton>
              <SaveButton onClick={handleSave}>저장</SaveButton>
              {type === 'expenditure' && (
                <CompleteButton onClick={handleComplete}>구매완료</CompleteButton>
              )}
              </ButtonBox>
              </div>
            </Container>
          );
};

export default CalendarInput;