import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
margin-left:20px;

`;

const Box = styled.div`
text-align:left;
margin-top: 80px;
gap:20px;

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
/* height:30px; */
font-size:16px;
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

const CalendarInput = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('token');
    //const role = localStorage.getItem('role');
    const [incomeTags, setIncomeTags] = useState([]);
    const [expendTags, setExpendTags] = useState([]);
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
    
    const handleTagChange = (event) => {
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
            "third_tag_id":thirdTagId,
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
            "third_tag_id":thirdTagId,
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
        const [firstTagId, setFirstTagId] = useState('');
  const [secondTagId, setSecondTagId] = useState('');
  const [thirdTagId, setThirdTagId] = useState('');

        const handleFirstTagChange = (event) => {
          const selectedFirstTagId = event.target.value;
          setFirstTagId(selectedFirstTagId);
      };
      const handleSecondTagChange = (event) => {
        const selectedSecondTagId = event.target.value;
        setSecondTagId(selectedSecondTagId);
    };
    const handleThirdTagChange = (event) => {
      const selectedThirdTagId = event.target.value;
      setThirdTagId(selectedThirdTagId);
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
                <TagBox>
                {!type && (
                  <TagSelect><option value="">태그를 선택하세요</option></TagSelect>
                )}
                {type === 'income' && (
                  <TagSelect onChange={handleTagChange}>
                    <option value="">태그를 선택하세요</option>
                    
                    {incomeTags.map(tag => (
                      <option key={tag.id} value={tag.id}>
                        {tag.tag_name}
                      </option>
                    ))}
                  </TagSelect>
                )}
                {type === 'expenditure' && (
                  <TagSelect onChange={handleFirstTagChange}>
                    <option value="">첫 번째 태그를 선택하세요</option>
                    {expendTags.map(firstTag => (
                        <option key={firstTag.first_tag_id} value={firstTag.first_tag_id}>
                            {firstTag.first_tag_name}
                        </option>
                    ))}
                </TagSelect>
                )}
                {type === 'expenditure' && firstTagId && (
                  <TagSelect onChange={handleSecondTagChange}>
                      <option value="">두 번째 태그를 선택하세요</option>
                      {expendTags
                          .find(tag => tag.first_tag_id === parseInt(firstTagId))
                          .tag_second_expenditure_dto_list.map(secondTag => (
                              <option key={secondTag.second_tag_id} value={secondTag.second_tag_id}>
                                  {secondTag.second_tag_name}
                              </option>
                          ))}
                  </TagSelect>
                )}
                {type === 'expenditure' && secondTagId && (
                  <TagSelect onChange={handleThirdTagChange}>
                      <option value="">세 번째 태그를 선택하세요</option>
                      {expendTags
                          .find(tag => tag.first_tag_id === parseInt(firstTagId))
                          .tag_second_expenditure_dto_list
                          .find(secondTag => secondTag.second_tag_id === parseInt(secondTagId))
                          .tag_third_expenditure_dto_list.map(thirdTag => (
                              <option key={thirdTag.third_tag_id} value={thirdTag.third_tag_id}>
                                  {thirdTag.third_tag_name}
                              </option>
                          ))}
                  </TagSelect>
              )}
              </TagBox>
      
    </InputTag>
        
              <InputDate>
              <Title>날짜</Title>
                <DateInput type="date" value={date} onChange={handleDate} />
              </InputDate>
        
              <InputMoney>
              <Title>가격</Title>
                <MoneyInput type="number" value={amount} onChange={handleAmount} /> 원
              </InputMoney>
        
              <InputMemo>
              <Title>메모</Title>
                <MemoInput type="text" value={memo} onChange={handleMemo} />
              </InputMemo>
              </Box>
              <div>

              <ButtonBox>
              
              <SaveButton onClick={()=> navigate('/calendar')}>취소</SaveButton>
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
