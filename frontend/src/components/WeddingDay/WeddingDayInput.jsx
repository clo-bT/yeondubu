import React,{ useState } from 'react';
// import Calender from '../../assets/Common/Calender.svg';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'react-datepicker/dist/react-datepicker.css'; 
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const Container = styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
`
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
const ImageBox= styled.div`

`
const Partner = styled.div`
display: flex;
flex-direction: column;
`
const PartnerName = styled.span``
const PartnerImg = styled.img`
border-radius: 218px;
`
const Me = styled.div`
display: flex;
flex-direction: column;
`
const Name = styled.span``
const Img = styled.img`
border-radius: 218px;
`
const Congrats = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
`

const DateInputDetail = styled.p`
color: #000;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`
const Button = styled.div`
display:flex;
flex-direction:column;
gap:10px;
margin-top:30px;
`
const BrideButton = styled.button`
color: rgba(255, 101, 101, 0.80);
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: bold;
line-height: normal;
padding : 10px 60px;
border: none;
border-radius: 10px;
`
const GroomButton = styled.button`
color: #4F91F4;
text-align: center;
font-size: 18px;
font-style: normal;
font-weight: bold;
line-height: normal;
padding : 10px 60px;
border: none;
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



const WeddingDayInput = () => {
    const accessToken = localStorage.getItem('token')
    const name = localStorage.getItem('name')
    const image = localStorage.getItem('image')
    const partner_name = localStorage.getItem('partner_name')
    const partner_img = localStorage.getItem('partner_img')
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const clearDate = () => {
        setSelectedDate(null);
      };
    const handleSend = (selectedRole) => {
      axios.post(`${process.env.REACT_APP_API_ROOT}/api/v1/couples/info`,
      {
        "user_role": selectedRole,
        "wedding_date": selectedDate
      },
      {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    // console.log(selectedRole)
    }
    return (
        <Container>
            <ImageBox>
              <Partner>
                <PartnerName>{partner_name}</PartnerName>
                <PartnerImg src={partner_img}/>
              </Partner>
              <Me>
                <Name>{name}</Name>
                <Img src={image}/>
              </Me>
            </ImageBox>
            <Congrats>연두부의 커플이 되신것을 <br />축하드립니다</Congrats>
            <DateInputDetail>{partner_name} ❤ {name} 님의 <br />결혼식 날짜를 입력해주세요</DateInputDetail>
            
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
            <Button>
              <BrideButton onClick={() => handleSend('BRIDE')}>신부 입장</BrideButton>
              <GroomButton onClick={() => handleSend('GROOM')}>신랑 입장</GroomButton>
            </Button>
        </Container>
    );
};

export default WeddingDayInput;