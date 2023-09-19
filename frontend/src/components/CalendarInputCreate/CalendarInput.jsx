import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarInputPage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
`

const Modal = styled.div`
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 80%;
    justify-content: space-between;
    align-items: center;

`
const ModalContent = styled.div`
    display: flex;
    gap:10px;
    flex-direction: column;
`
const CloseModal = styled.div`
    display: flex;
    justify-content: end;
`
const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
`
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

const InputTag = styled.div`
display: flex;
align-items: center;
`
const InputDate = styled.div`
display: flex;
align-items: center;
`
const BoldSpan = styled.span`
    font-weight: bold;
`
const InputMoney = styled.div`
display: flex;
align-items: center;
`
const InputSpan = styled.span`
margin-right: 20px;
`
const InputMemo = styled.div`
display: flex;
align-items: center;
`
const CalendarFooter = styled.div`
width: 90%;
display: flex;
gap:10px;
justify-content:center;
align-items:center;
`
const UpdateButton = styled.button`
    width: 87px;
    height: 38px;
    padding: 6px 4px;
    gap: 10px;
    border: 2px solid #D9D9D9;
    border-radius: 10px;
    background: #D9D9D9;
    cursor: pointer;
    font-weight: bold;
`
const SaveButton = styled.button`
    width: 87px;
    height: 38px;
    padding: 6px 4px;
    border: 2px solid #D9D9D9;
    gap: 10px;
    border-radius: 10px;
    background: #D9D9D9;
    cursor: pointer;
    font-weight: bold;

`
const CompleteButton = styled.button`
    width: 87px;
    height: 38px;
    padding: 6px 4px;
    gap: 10px;
    color: white;
    border: 2px solid #FF937D;
    border-radius: 10px;
    background: #FF937D;
    cursor: pointer;
    font-weight: bold;

`



// const TagCreatePage = styled.div``
const CalendarInput = ({ isOpen, content, formatday, closeModal }) => {
    const [selectedWho, setSelectedWho] = useState(''); 
    const [selectedType, setSelectType] = useState(''); 
    
    const handleSelectWho = (who) => {
        setSelectedWho(who); // 선택된 결제자 업데이트
    };
    const handleSelectType = (type) => {
        setSelectType(type); // 선택된 결제자 업데이트
    };
    if (!isOpen) {
        return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음
    }
    const handleModalClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 중단
    };

    return (
        <CalendarInputPage onClick={closeModal}>
            <Modal onClick={handleModalClick}>
            <ModalContent>
            <CloseModal><CloseButton onClick={closeModal}>X</CloseButton></CloseModal>
                    <InputType>
                        <InputSpan>분류 </InputSpan>
                        <InputTypeIncome
                            checked={selectedType === '수입'}
                            onClick={() => handleSelectType('수입')}
                        >
                            수입
                        </InputTypeIncome>
                        <InputTypeExpend
                            checked={selectedType === '지출'}
                            onClick={() => handleSelectType('지출')}
                        >
                            지출
                        </InputTypeExpend>
                    </InputType>
                    
                    <InputWho><InputSpan>결제 </InputSpan>
                        <InputWhoGroom
                            checked={selectedWho === '예비신랑'}
                            onClick={() => handleSelectWho('예비신랑')}
                        >
                            예비신랑
                        </InputWhoGroom>
                        <InputWhoBride
                            checked={selectedWho === '예비신부'}
                            onClick={() => handleSelectWho('예비신부')}
                        >
                            예비신부
                        </InputWhoBride>
                    </InputWho>

                    <InputTag><InputSpan>태그 </InputSpan></InputTag>
                    <InputDate><InputSpan>날짜 </InputSpan> <BoldSpan>{formatday}</BoldSpan></InputDate>
                    <InputMoney><InputSpan>가격 </InputSpan> <BoldSpan>{content.amount.toLocaleString()} </BoldSpan>원</InputMoney>
                    <InputMemo><InputSpan>메모 </InputSpan></InputMemo>
                </ModalContent>
                <CalendarFooter>
                    <UpdateButton>수정</UpdateButton>
                    <SaveButton>저장</SaveButton>
                    <CompleteButton>구매완료</CompleteButton>
                </CalendarFooter>
            </Modal>
        </CalendarInputPage>
    );
};

export default CalendarInput;