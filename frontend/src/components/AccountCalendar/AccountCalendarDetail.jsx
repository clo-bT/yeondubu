import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CalendarInput from '../CalendarInputCreate/CalendarInput';
import axios from 'axios';

const ModalPage = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 355px;
margin-top: 40px;
`
const IncomeExpenditure = styled.div`
`
const IncomeRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 300px;
margin-bottom: 10px;
cursor: pointer;

&::before {
    content: '';
    position: absolute;
    left: 21px;
    width: 2px; /* 세로 줄의 너비 설정 */
    height: 5%; /* 부모 요소의 높이에 맞게 설정 */
    background-color: #FF6565; /* 세로 줄의 색상 설정 */
  }

`;

const TagAndWho = styled.div`
  display: flex;
  align-items: flex-start;
flex-direction: column;


`;
const IncomeTag = styled.div``;
const IncomeWho = styled.div`
font-size: .5rem;
margin-top: 2px;
`;
const IncomeMoney = styled.div`
font-size: 15px;
`;
const ExpenditureRow = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 300px;
margin-bottom: 10px;
cursor: pointer;

&::before {
    content: '';
    position: absolute;
    left: 21px;
    width: 2px; /* 세로 줄의 너비 설정 */
    height: 5%; /* 부모 요소의 높이에 맞게 설정 */
    background-color: #2663FF; /* 세로 줄의 색상 설정 */
  }
`;
const ExpenditureTag = styled.div``;
const ExpenditureWho = styled.div`
font-size: .5rem;
margin-top: 2px;
`;
const ExpenditureMoney = styled.div`
font-size: 15px;
`;






const AccountCalendarDetail = ({ formatday }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(false);

    function openModal(item) {
        setDataDetail(item)
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

     const [responseData, setResponseData] = useState([]);
     useEffect(() => {
        const accessToken = localStorage.getItem("token");
         // 백틱으로 바꾸기
         axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/${formatday}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
         .then(response => {
            console.log(response)
             setResponseData(response.data);
         })
         .catch(error => {
             console.error('Error fetching data:', error);
         });
     }, []);

    return (
        <ModalPage>
            { responseData && (
                responseData.date === formatday && (
                    <IncomeExpenditure>
                        {responseData.incomeList.map(incomeItem => (
                            <IncomeRow key={incomeItem.id} onClick={() => openModal(incomeItem)}>
                                <TagAndWho>
                                    <IncomeTag>{incomeItem.first_tag_name}</IncomeTag>
                                    <IncomeWho>{incomeItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</IncomeWho>
                                </TagAndWho>
                                <IncomeMoney>+{incomeItem.amount.toLocaleString()}</IncomeMoney>
                            </IncomeRow>
                        ))}
                        {responseData.expenditureList.map(expenditureItem => (
                            <ExpenditureRow key={expenditureItem.id} onClick={() => openModal(expenditureItem)}>
                                <TagAndWho>
                                    <ExpenditureTag>{expenditureItem.first_tag_name}</ExpenditureTag>
                                    <ExpenditureWho>{expenditureItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</ExpenditureWho>
                                </TagAndWho>
                                <ExpenditureMoney>-{expenditureItem.amount.toLocaleString()}</ExpenditureMoney>
                            </ExpenditureRow>
                        ))}
                    </IncomeExpenditure>
                )
            )}
            <p>{formatday}</p>
            <CalendarInput isOpen={isModalOpen} content={dataDetail} formatday={formatday} closeModal={closeModal}/>

        </ModalPage>
    );
};

export default AccountCalendarDetail;