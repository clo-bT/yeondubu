import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarInput from '../CalendarInputCreate/CalendarInput';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; 

const ModalPage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const IncomeExpenditure = styled.div``
const Table = styled.table``
const TableHeader = styled.thead``;
const TableBody = styled.tbody``;
const TableRow = styled.tr``;
const TableCell = styled.td`
  color: black;
`;

const IncomeTableCell = styled(TableCell)`
  color: red; 
  cursor: pointer;
`;

const ExpenditureTableCell = styled(TableCell)`
  color: blue;
  cursor: pointer;
`;


const responseData =
{
    "date": "2023-09-07",
    "incomeList": [
        {
            "id": 1,
            "role": "GROOM",
            "amount": 1000000,
            "first_tag_id": 1,
            "first_tag_name": "용돈",
            "memo": "할아버지께서 결혼자금 보내주심"
        },
        {
            "id": 2,
            "role": "BRIDE",
            "amount": 500000,
            "first_tag_id": 1,
            "first_tag_name": "용돈",
            "memo": "적금 50만원 이체"
        }
    ],
    "expenditureList": [
        {
            "id": 1,
            "role": "BRIDE",
            "tag_id": 1,
            "first_tag_name": "혼수",
            "second_tag_name": "가구",
            "third_tag_name": "침대",
            "amount": 400000,
            "memo": "이케아"
        },
        {
            "id": 2,
            "role": "GROOM",
            "tag_id": 2,
            "first_tag_name": "혼수",
            "second_tag_name": "가전",
            "third_tag_name": "냉장고",
            "amount": 800000,
            "memo": "비스포크"
        }
    ]
};



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

    // const [responseData, setResponseData] = useState([]);
    // useEffect(() => {
    //     // 백틱으로 바꾸기
    //     axios.get($`/api/v1/cash?date={formatday}`)
    //     .then(response => {
    //         setResponseData(response.data);
    //     })
    //     .catch(error => {
    //         console.error('Error fetching data:', error);
    //     });
    // }, []);

    return (
        <ModalPage>
            { responseData && (
                    responseData.date === formatday && (
                <IncomeExpenditure>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableCell>항목</TableCell>
                            <TableCell>가격</TableCell>
                            <TableCell>결제자</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {responseData.incomeList.map(incomeItem => (
                            <TableRow key={incomeItem.id} onClick={() => openModal(incomeItem)}>
                                <IncomeTableCell>{incomeItem.first_tag_name}</IncomeTableCell>
                                <IncomeTableCell>+{incomeItem.amount.toLocaleString()}</IncomeTableCell>
                                <IncomeTableCell>{incomeItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</IncomeTableCell>
                            </TableRow>
                            ))}
                            {responseData.expenditureList.map(expenditureItem => (
                            <TableRow key={expenditureItem.id} onClick={() => openModal(expenditureItem)}>
                                <ExpenditureTableCell>{expenditureItem.first_tag_name}</ExpenditureTableCell>
                                <ExpenditureTableCell>-{expenditureItem.amount.toLocaleString()}</ExpenditureTableCell>
                                <ExpenditureTableCell>{expenditureItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</ExpenditureTableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </IncomeExpenditure>

                )
            )}
            <p>{formatday}</p>
            <CalendarInput isOpen={isModalOpen} content={dataDetail} formatday={formatday} closeModal={closeModal}/>

        </ModalPage>
    );
};

export default AccountCalendarDetail;