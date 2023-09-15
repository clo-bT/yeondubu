import React from 'react';
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
  z-index: 1000;
  `

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
`
const InputType = styled.div``
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`
const InputWho = styled.div``
const InputWhoGroom = styled.button`
    width: 87px;
    height: 38px;
    padding: 6px 4px;
    gap: 10px;
    border-radius: 10px;
    border: 2px solid #D9D9D9;
    background: #FFF;
`
const InputWhoBride = styled.button`
    width: 87px;
    height: 38px;
    padding: 6px 4px;
    gap: 10px;
    border-radius: 10px;
    border: 2px solid #D9D9D9;
    background: #FFF;
`
const InputTag = styled.div``
const InputDate = styled.div``
const InputMoney = styled.div``
const InputSpan = styled.span``
const InputMemo = styled.div``
const CloseModal = styled.div``



// const TagCreatePage = styled.div``
const CalendarInput = ({ isOpen, content, formatday, closeModal }) => {

    if (!isOpen) {
        return null; // 모달이 닫혀있으면 아무것도 렌더링하지 않음
    }
    const handleModalClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 중단
    };


    return (
        <CalendarInputPage onClick={closeModal}>
            <ModalContent onClick={handleModalClick}>
                <CloseModal onClick={closeModal}><CloseButton>X</CloseButton></CloseModal>
                <InputType>
                    <InputSpan>분류 </InputSpan>
                </InputType>
                
                <InputWho><InputSpan>결제자 </InputSpan>
                    <InputWhoGroom>
                        예비신랑
                    </InputWhoGroom>
                    <InputWhoBride>
                        예비신부
                    </InputWhoBride>
                </InputWho>

                <InputTag><InputSpan>태그 </InputSpan></InputTag>
                <InputDate><InputSpan>날짜 </InputSpan> {formatday}</InputDate>
                <InputMoney><InputSpan>가격 </InputSpan> {content.amount.toLocaleString()} 원</InputMoney>
                <InputMemo><InputSpan>메모 </InputSpan></InputMemo>


            </ModalContent>
        </CalendarInputPage>
    );
};

export default CalendarInput;