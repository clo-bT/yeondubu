import {React, useState} from 'react';
import Calender from '../../assets/Common/Calender.svg';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-datepicker/dist/react-datepicker.css'; 
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';

const StyledDatePicker = styled(DatePicker)`
    width: 254px;
    height: 43px;
    flex-shrink: 0;
    border: 1px solid rgba(0, 0, 0, 0.20);
    background: #FFF;
    font-size: 20px; /* 글꼴 크기 조정 */
    text-align: center; 
    color: #FF5A5A;
    position: relative;
    /* 위치 조정 */
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      cursor: pointer;
    }
`;

const Congrats = styled.p`
color: #000;
text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top : 50px;
`

const DateInputDetail = styled.p`
color: #000;
text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
margin-top: 30px;
`

const InputButton = styled.button`
color: #FF5A5A;
text-align: center;
font-family: Inter;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
padding : 10px 20px;
border: none;
margin-top : 60px;
border-radius: 10px;
`

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 20px;
  position: relative;
`;

const StyledCalendarIcon = styled.img`
width: 24px;
height: 24px;
cursor: pointer;
position: absolute;
left: 140px; 
top: 50%; 
transform: translateY(-50%);
`;


const WeddingDayInput = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const clearDate = () => {
        setSelectedDate(null);
      };

    return (
        <div>
            <Congrats>연두부의 커플이 되신것을 <br />축하드립니다</Congrats>
            <DateInputDetail>현빈 ❤ 손예진 님의 <br />결혼식 날짜를 입력해주세요</DateInputDetail>
            
            <DateInputContainer>
            <StyledDatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            isClearable
            customCloseIcon={
                <FontAwesomeIcon icon={faAlignCenter} onClick={clearDate} />}
            />
            {/* <StyledCalendarIcon src={Calender} onClick={openCalendar} /> */}
            </DateInputContainer>
            
            <InputButton>입력하기</InputButton>
        </div>
    );
};

export default WeddingDayInput;