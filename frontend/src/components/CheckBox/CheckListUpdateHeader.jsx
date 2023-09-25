import React, { useState } from 'react';
import styled from 'styled-components';
import TagSelect from '../TagInput/TagSelect';

const Box = styled.div`
display: flex;
justify-content: space-between;
`
const SaveAtag = styled.a`
color: #FF6565;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;    
text-decoration: none;
margin-top: 20px;
margin-right: 20px;
`

const AddTag = styled.a`
color: #FF6565;
font-size: 15px;
font-style: normal;
font-weight: 600;
line-height: normal;   
text-decoration: none;
margin-left: 20px;
margin-top: 20px;
`
const CheckHeader = styled.p`
color: #000;
text-align: center;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const CheckDetail = styled.p`
color: #838383;
text-align: center;
font-size: 15px;
font-style: normal;
font-weight: 400;
line-height: normal;    

`

const CheckIcon = styled.span`
stroke-width: 2px;
color: #FF6565;
`

const HorizonLine = styled.p`
background: #FFD0D0;    
margin-top: 35px;
width: 100%;
height: 1.5px;
`
const CheckListUpdateHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    return (
        <div>
            <Box>
            <AddTag onClick={openModal}>추가하기</AddTag>
            <SaveAtag href="/">적용하기</SaveAtag>

            </Box>
            <CheckHeader>우리 부부를 위한 체크리스트
                <CheckIcon>✔</CheckIcon></CheckHeader>
            <CheckDetail>우리 부부의 결혼식에 필요한 <br />모든 것들을 직접 입력해보세요</CheckDetail>
            <HorizonLine />
            <TagSelect isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default CheckListUpdateHeader;