import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;


`;

const ModalContent = styled.div`
  background: #fff;
  padding: 15px 35px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;

  width:100%;
  height: 80%;

`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;    

`
const TagSettingHeader = styled.p`
color: #000;
font-size: 24px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;   

`
const TagHeader = styled.p`
color: rgba(0, 0, 0, 0.80);
text-align: center;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-transform: uppercase;   

`

const Tag1Input = styled.input`
border-radius: 10px;
border: 1px solid #FF5959;
background: #FFF;   
width: 80%;
height: 32px;
`

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #FF5959;
    color: #FFF;
  }
`;

const Dropdown = styled.div`
  background: #FFF;
  border: 1px solid #FF5959;
  border-radius: 5px;
  width: 80%;
height: 96px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`; 

const SaveButton = styled.button`

color: #FF5A5A;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 700;
line-height: normal;
text-transform: uppercase;   
border: none;
border-radius: 10px;
padding: 10px 15px;
margin: 30px auto;
`
const CancelButton = styled.button`
border: none;
background-color: #FFF;

`
const Header = styled.div`
display:flex;
justify-content: space-between;

`

const TagSelect = ({ isOpen, onClose }) => {
    const [tagName, setTagName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
  
    const handleTagNameChange = (e) => {
      setTagName(e.target.value);
    };
  
    const handleCategoryDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
      setIsSubDropdownOpen(false); // 대분류 dropdown만 열리도록 설정
    };
  
    const handleSubCategoryDropdownClick = () => {
      setIsSubDropdownOpen(!isSubDropdownOpen);
    };
  
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
      setTagName(category);
      setIsDropdownOpen(false);
    };
  
    const handleSubCategorySelect = (subCategory) => {
      setSelectedSubCategory(subCategory);
      setIsSubDropdownOpen(false);
    };
  
    const handleSaveTag = () => {
      // 여기에서 tagName, selectedCategory, selectedSubCategory를 사용하여 추가 작업 수행
      // 예: API 호출 또는 상태 업데이트
      console.log('Tag added:', tagName);
      console.log('Category:', selectedCategory);
      console.log('Subcategory:', selectedSubCategory);
  
      // 모달을 닫습니다.
      onClose();
    };

    return (
        <>
        {isOpen && (
          <ModalWrapper>
            <ModalContent>
                <Header>
              <TagSettingHeader>태그 설정</TagSettingHeader>
              <CancelButton onClick={onClose}>X</CancelButton>

                </Header>
            <Box>
              <TagHeader>대분류</TagHeader>
              <Tag1Input
              type="text"
              value={tagName}
              onChange={handleTagNameChange}
              onClick={handleCategoryDropdownClick}
              />
              <Dropdown isOpen={isDropdownOpen}>
                <DropdownItem onClick={() => handleCategorySelect('혼수')}>혼수</DropdownItem>
                <DropdownItem onClick={() => handleCategorySelect('결혼식')}>결혼식</DropdownItem>
                <DropdownItem onClick={() => handleCategorySelect('기타')}>기타</DropdownItem>
              </Dropdown>
              
              {selectedCategory !== '기타' && (
              <>
                <TagHeader>중분류</TagHeader>
                  <Tag1Input
                    type="text"
                    value={selectedSubCategory}
                    onChange={() => {}}
                    onClick={handleSubCategoryDropdownClick}
                  />
                  <Dropdown isOpen={isSubDropdownOpen}>
                    {selectedCategory === '혼수' && (
                      <>
                        <DropdownItem onClick={() => handleSubCategorySelect('가구')}>가구</DropdownItem>
                        <DropdownItem onClick={() => handleSubCategorySelect('가전')}>가전</DropdownItem>
                        <DropdownItem onClick={() => handleSubCategorySelect('기타')}>기타</DropdownItem>
                      </>
                    )}
                    {selectedCategory === '결혼식' && (
                      <>
                        <DropdownItem onClick={() => handleSubCategorySelect('스튜디오')}>스튜디오</DropdownItem>
                        <DropdownItem onClick={() => handleSubCategorySelect('드레스')}>드레스</DropdownItem>
                        <DropdownItem onClick={() => handleSubCategorySelect('메이크업')}>메이크업</DropdownItem>
                        <DropdownItem onClick={() => handleSubCategorySelect('예식장')}>예식장</DropdownItem>
                      </>
                    )}
                  </Dropdown>
              </>
            )}
              <TagHeader>추가할 항목</TagHeader>
              <Tag1Input type="text"/>


              <SaveButton onClick={handleSaveTag}>추가하기</SaveButton>
                </Box>
            </ModalContent>
          </ModalWrapper>
        )}
      </>
    );
  };

export default TagSelect;