import React from 'react';
import styled from 'styled-components';

const ModalPage = styled.div``
const IncomeExpenditure = styled.div``
const IncomeList = styled.ul``
const IncomeItem = styled.li``
const IncomeItemData = styled.div``
const ExpenditureList = styled.ul``
const ExpenditureItem = styled.li``
const ExpenditureItemData = styled.div``


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
    return (
        <ModalPage>
            { responseData && (
                    responseData.date === formatday && (
                <IncomeExpenditure>
                        
                    <IncomeList>
                        {responseData.incomeList.map(incomeItem => (
                                <IncomeItem key={incomeItem.id}>
                                        <IncomeItemData>항목: {incomeItem.first_tag_name}</IncomeItemData>
                                        <IncomeItemData>가격: {incomeItem.amount}</IncomeItemData>
                                        <IncomeItemData>결제자: {incomeItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</IncomeItemData>
                                </IncomeItem>
                        ))}
                    </IncomeList>

                    <ExpenditureList>
                        {responseData.expenditureList.map(expenditureItem => (
                        <ExpenditureItem key={expenditureItem.id}>
                                <ExpenditureItemData>항목: {expenditureItem.first_tag_name}</ExpenditureItemData>
                                <ExpenditureItemData>가격: {expenditureItem.amount}</ExpenditureItemData>
                                <ExpenditureItemData>결제자: {expenditureItem.role === "BRIDE" ? "예비신부" : "예비신랑"}</ExpenditureItemData>
                                </ExpenditureItem>
                        ))}
                    </ExpenditureList>
                </IncomeExpenditure>

                )
            )}
            <p>{formatday}</p>
        </ModalPage>
    );
};

export default AccountCalendarDetail;