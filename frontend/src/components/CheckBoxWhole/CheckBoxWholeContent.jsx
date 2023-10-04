import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`
const Income = styled.div``
const Expend = styled.div``
const Box = styled.div`
display: flex;
justify-content: flex-end;
gap: 12px;    
margin-right: 20px;

`
const AddButton = styled.a`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    
cursor: pointer;

`
const NewTag = styled.input`
width: 83px;

`
const EditButton = styled.a`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;    
cursor: pointer;

`
const Tag = styled.div`
display:flex;
gap:5px;
`
const TagBox = styled.div`
border-radius: 10px;
border: 2px solid #2663FF;
background: rgba(255, 255, 255, 0.50);
display: flex;
width: 83px;
height: 83px;
padding: 14px 8px;
flex-direction: column;
justify-content: center;
align-items: center;
cursor: pointer;
`
const FirstTag = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;   
cursor: pointer;
`

const SecondTag = styled.p`
color: rgba(0, 0, 0, 0.50);
text-align: center;
font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const TagList = styled.div`
display:flex;
gap:80px;
`
const CheckBox = styled.input``
const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  top: 0;
`;

const CheckBoxWholeContent = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('token');
  const [data, setData] = useState([]);
  const [isSelected, setIsSelected] = useState(0);
  const [tagId, setTagId] = useState(0);
  const [secondtagId, setSecondTagId] = useState(0);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [newTagName, setNewTagName] = useState('');
  const inputRef = useRef(null);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/all`,
    {
      headers: {
          Authorization: `Bearer ${accessToken}`,
        }
    }).then(response => {
        console.log('여기는 태그 다 조회',response)
        setData(response.data)
    })
    .catch(error => {
        console.error('여기는 태그 다 조회', error);
    });
  },[accessToken])


  const handleSelect =  (data, first_tag_name,id) => {
    setIsSelected(1)
    setSelectedData(data)
    setSelectedName(first_tag_name)
    setFirstName(first_tag_name)
    setTagId(id)
  }
  const handleClick =  (data, second_tag_name,tagId) => {
    setIsSelected(2)
    setSelectedData(data)
    setSelectedName(second_tag_name)
    setSecondName(second_tag_name)
    setSecondTagId(tagId)
  }
  const handleAddTag = () => {
    setIsAddingTag(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    };
    const handleCancelClick = () => {
      setIsAddingTag(false);
      setNewTagName(''); 
      if (inputRef.current) {
        inputRef.current.blur(); 
      }
    };

    const handleSaveClick = () => {
    
      if (isSelected === 0) {
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/${newTagName}`, {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
          .then(response => {
            console.log('새로운 태그 추가', response);
            setIsAddingTag(false);
            setNewTagName('');
            window.location.reload();
          })
          .catch(error => {
            console.error('새로운 태그 추가', error);
          });
      } else if (isSelected === 1) {
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/${firstName}/${newTagName}`, {
          first_tag_id: tagId,
          second_tag_name:newTagName
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        },[tagId])
          .then(response => {
            console.log('새로운 태그 추가', response);
            setIsAddingTag(false);
            setNewTagName('');
            window.location.reload();
          })
          .catch(error => {
            console.error('새로운 태그 추가', error);

          });
      } else if (isSelected === 2) {
        axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/${firstName}/${secondName}/${newTagName}`, {
          "first_tag_id": tagId,
          "second_tag_id": secondtagId,
          "third_tag_name": newTagName
      }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        })
          .then(response => {
            console.log('새로운 태그 추가', response);
            setIsAddingTag(false);
            setNewTagName('');
            window.location.reload();
          })
          .catch(error => {
            console.error('새로운 태그 추가', error);
          });
      }
    };
  const handleCheckboxChange = async (data) => {
    try {
      const updatedData = { ...data, pay_complete: !data.pay_complete };
      console.log('updatedData',updatedData)

      await axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${data.money_expenditure_id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      const updatedSelectedData = selectedData.map(item => (item.third_tag_id === data.third_tag_id ? updatedData : item));
      setSelectedData(updatedSelectedData);

    } catch (error) {
      console.error('Error updating data:', error);
      
    }
  };
    const handleDeleteFirstTag = (event, firstTagId) => {
      event.stopPropagation(); 
      axios.delete(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/tags/${firstTagId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log('태그 삭제', response);
          window.location.reload();

        })
        .catch((error) => {
          console.error('태그 삭제', error);
        });
  };
  
    return (

        <div>
         
        <Expend><Box>

        <AddButton onClick={handleAddTag}>추가</AddButton>
        {!isEditMode && <EditButton onClick={()=>setIsEditMode(true)}>편집</EditButton>}
        {isEditMode && <EditButton onClick={()=>setIsEditMode(false)}>저장</EditButton>}
        </Box>
    <Container>
    {(isSelected===0 )&& data.map((firstTag) => (
      <TagBox key={firstTag.first_tag_id} onClick={() => handleSelect(firstTag.tag_second_expenditure_dto_list, firstTag.first_tag_name,firstTag.first_tag_id)}>
            {isEditMode && (
    <DeleteButton onClick={(e) => handleDeleteFirstTag(e, firstTag.first_tag_id)}>X</DeleteButton>
  )}
      <FirstTag>{firstTag.first_tag_name}</FirstTag>
      <div>
        {firstTag.tag_second_expenditure_dto_list.map((secondTag) => (
          <SecondTag key={secondTag.second_tag_id}>
            {secondTag.second_tag_name}
            {/*
            {secondTag.tag_third_expenditure_dto_list.map((thirdTag) => (
              <SecondTagItem key={thirdTag.third_tag_id}>
                {thirdTag.third_tag_name}
              </SecondTagItem>
            ))}
            */}
          </SecondTag>
        ))}
      </div>
    </TagBox>
  ))}
  {(isSelected===1) && (
    <div>
      <FirstTag onClick={()=>setIsSelected(0)}>{selectedName}</FirstTag>
    {selectedData.map((data) => (
    <TagBox key={data.second_tag_id} onClick={() => handleClick(data.tag_third_expenditure_dto_list,data.second_tag_name,data.second_tag_id)}>
      {isEditMode && (
    <DeleteButton onClick={(e) => handleDeleteFirstTag(e, data.second_tag_id)}>X</DeleteButton>
  )}
      <FirstTag>{data.second_tag_name}</FirstTag>
      <Tag>
        {data.tag_third_expenditure_dto_list.map((thirdTag) => (
          <SecondTag key={thirdTag.second_tag_id}>
            {thirdTag.third_tag_name}
          </SecondTag>
        ))}
      </Tag>
    </TagBox>
    ))}
    </div>
  )}
  {(isSelected===2) && (
    <div>
      <FirstTag onClick={()=>setIsSelected(0)}>{selectedName}</FirstTag>
    {selectedData.map((data) => (
      <div key={data.third_tag_id} onClick={()=>navigate(`/calendarupdate/${data.third_tag_id}`)}>
        <TagList>
          <FirstTag>{data.third_tag_name}</FirstTag>
          <FirstTag>{data.amount === 0 ? '예산 입력' : data.amount}</FirstTag>
          <CheckBox
            type="checkbox"
            checked={data.pay_complete}
            onChange={() => {
              if (data.amount !== 0 && data.user_role !== undefined) {
                handleCheckboxChange(data);
              }
            }}
            disabled={data.amount === 0 || data.user_role === undefined}
          />
        </TagList>
    </div>
    ))}
    </div>
  )}
  {isAddingTag && (
  <TagBox>
    <NewTag
      type="text"
      value={newTagName}
      onChange={(e) => setNewTagName(e.target.value)}
      placeholder=""
      ref={inputRef}
    />
    <Tag>
    <FirstTag onClick={handleCancelClick}>취소</FirstTag>
    <FirstTag onClick={handleSaveClick}>저장</FirstTag>
    </Tag>
  </TagBox>
    )}
    </Container></Expend>
        
            

    </div>
        );
        };

export default CheckBoxWholeContent;