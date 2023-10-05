import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VeryBigContainer = styled.div`
margin-bottom: 90px;
`

const BigContainer = styled.div`
  display: flex;
  justify-content: center; /* 가로축 가운데 정렬 */
  /* margin-bottom: 90px; */
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px;
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

width: 90px;
height: 20px;
margin-bottom: 20px;
margin-top: 20px;
border: 2px solid #fab9b9;
border-radius: 5px;
color: #000;
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
display: flex;
justify-content: center;


`
const TagBox = styled.div`
border-radius: 10px;
border: 1px solid #FF5A5A;
background: rgba(255, 255, 255, 0.50);
padding: 17px 17px;
cursor: pointer;
width: 90px;
height: 90px;
/* gap: 10px; */

`
const FirstTag = styled.p`

  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
margin-top: 10px;
`;


const SecondTag = styled.p`
  color: rgba(0, 0, 0, 0.50);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap; 
`;

const TagList = styled.div`
display:flex;
/* width: 90%; */
margin-left: 10px;
margin-right: 10px;
align-items: center;
justify-content: space-between;

/* gap:80px; */
`
const CheckBox = styled.input``
const DeleteButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  top: 0;
`;

const SecondContainer = styled.p`
  display: flex;
  flex-wrap: wrap; 
  gap: 10px;
  justify-content: center; 

`

const ModalContainer = styled.div`
  display: ${(props) => (props.isopen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const HorizonLine = styled.p`
  width:100%;
  height: 1px;
  background: #FF5A5A;

`
const CheckBoxWholeContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  

  const openModal = (content) => {
    setIsModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  
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

  const handleInputChange = (e) => {
    const tmp = e.target.value
    setNewTagName(tmp);
  };
    const handleAddTag = () => {
      const modalContent = (
        <ModalContent>
          <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
          <NewTag
            type="text"
            // value={newTagName}
            onChange={handleInputChange}
  
            ref={inputRef}
          />
 
          <Tag>
            {/* <FirstTag onClick={handleCancelClick}>취소</FirstTag> */}
            <FirstTag
              onClick={() => {
                handleSaveClick();
                closeModal();
              }}
            >
              저장
            </FirstTag>
          </Tag>
        </ModalContent>
      );
    
      openModal(modalContent);
    };
    // const handleCancelClick = () => {
    //   setIsAddingTag(false);
    //   setNewTagName(''); 
    //   if (inputRef.current) {
    //     inputRef.current.blur(); 
    //   }
    // };

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
<VeryBigContainer>
<Box>
        <AddButton onClick={handleAddTag}>추가</AddButton>
        {!isEditMode && <EditButton onClick={() => setIsEditMode(true)}>편집</EditButton>}
        {isEditMode && <EditButton onClick={() => setIsEditMode(false)}>저장</EditButton>}
      </Box>
        
    <BigContainer>
    <Container>
    {(isSelected===0 )&& data.map((firstTag) => (
      <TagBox>
      <div key={firstTag.first_tag_id} onClick={() => handleSelect(firstTag.tag_second_expenditure_dto_list, firstTag.first_tag_name,firstTag.first_tag_id)}>
            {isEditMode && (
    <DeleteButton onClick={(e) => handleDeleteFirstTag(e, firstTag.first_tag_id)}>X</DeleteButton>
  )}
      <FirstTag>{firstTag.first_tag_name}</FirstTag>

        {firstTag.tag_second_expenditure_dto_list.slice(0,2).map((secondTag) => (
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
    </Container>
    </BigContainer>
    {/* </BigContainer> */}

  

        {/* <FirstTagHeader onClick={()=>setIsSelected(0)}>{selectedName}</FirstTagHeader> */}
  {(isSelected===1) && (
    <SecondContainer>
    {selectedData.map((data) => (
    <TagBox key={data.second_tag_id} onClick={() => handleClick(data.tag_third_expenditure_dto_list,data.second_tag_name,data.second_tag_id)}>
      {isEditMode && (
    <DeleteButton onClick={(e) => handleDeleteFirstTag(e, data.second_tag_id)}>X</DeleteButton>
  )}
      <FirstTag>{data.second_tag_name}</FirstTag>
      <Tag>
        {data.tag_third_expenditure_dto_list.slice(0,2).map((thirdTag) => (
          <SecondTag key={thirdTag.second_tag_id}>
            {thirdTag.third_tag_name}

            </SecondTag>
        ))}
      </Tag>
    </TagBox>
    ))}
      </SecondContainer>
  )}



  {(isSelected===2) && (
    <div>
      <FirstTag onClick={()=>setIsSelected(0)}>{selectedName}</FirstTag>
<HorizonLine />
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

  {/* {isAddingTag && (
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
    )} */}

    
{isModalOpen && (
        <ModalContainer isopen={isModalOpen}>
          {modalContent}
        </ModalContainer>
      )}
            

</VeryBigContainer>
      
        );
      };
export default CheckBoxWholeContent;