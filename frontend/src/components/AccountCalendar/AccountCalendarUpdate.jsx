import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``
const Role = styled.div``
const RoleLabel = styled.label``
const RoleInput = styled.input``
const DateLabel = styled.label``
const DateInput = styled.input``
const AmountLabel = styled.label``
const AmountInput = styled.input``
const MemoLabel = styled.label``
const MemoInput = styled.input``
const EditButton = styled.button``
const CalendarInputUpdate = () => {
    const accessToken = localStorage.getItem('token')
    const [expenditureData, setExpenditureData] = useState({
        expenditure_id: 1,
        user_role: "BRIDE",
        date: "2024-05-16",
        amount: 100000,
        memo: "구매한 침대",
        pay_complete: true
    });

    const [updatedData, setUpdatedData] = useState({
        user_role: '',
        date: '',
        amount: 0,
        memo: ''
    });

    const { tagId } = useParams();

    useEffect(() => {
        // API 요청을 보내고 응답 데이터를 expenditureData 상태로 설정
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${tagId}`,{
            headers:{
              Authorization: `Bearer ${accessToken}`,
            }
        })
            .then(response => {
                setExpenditureData(response.data);
                // 기본값 설정
                setUpdatedData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [tagId, accessToken]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // 입력 필드 값 업데이트
        setUpdatedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdate = () => {
        // 수정 요청 보내기
        axios.put(`${process.env.REACT_APP_API_ROOT}/api/v1/expenditure/money/${expenditureData.expenditure_id}`, updatedData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log('수정 성공:', response);
            // 성공적으로 수정된 경우 필요한 로직 추가
        })
        .catch(error => {
            console.error('수정 실패:', error);
        });
    };

    return (
        <Container>
            <Role>
                <RoleLabel>사용자 역할</RoleLabel>
                <RoleInput type="text" name="user_role" value={updatedData.user_role} onChange={handleInputChange} placeholder={expenditureData.user_role} />
            </Role>
            <DateLabel>날짜</DateLabel>
            <DateInput type="date" name="date" value={updatedData.date} onChange={handleInputChange} placeholder={expenditureData.date} />
            <AmountLabel>가격</AmountLabel>
            <AmountInput type="number" name="amount" value={updatedData.amount} onChange={handleInputChange} placeholder={expenditureData.amount} />
            <MemoLabel>메모</MemoLabel>
            <MemoInput type="text" name="memo" value={updatedData.memo} onChange={handleInputChange} placeholder={expenditureData.memo} />
            <EditButton onClick={handleUpdate}>수정</EditButton>
        </Container>
    );
};

export default CalendarInputUpdate;
