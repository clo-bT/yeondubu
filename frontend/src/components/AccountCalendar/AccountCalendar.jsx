import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/locale';

const Container = styled.div`
`

const Box = styled.div`
display: flex;
flex-direction: column;
margin-left: 20px;
margin-right: 20px;
`
const CalendarHeader = styled.div`
/* width: 355px; */
display: flex;
justify-content: space-between;
/* padding: 10px; */
font-size: 18px;
font-weight: bold;

`
const Col = styled.p`
margin-left: 20px;
margin-right: 20px;

`

// DaysClass는 요일 적힌 거
const DaysClass = styled.div`
display: flex;
justify-content: space-between;
/* margin-left: 7px; */
/* margin-right: 7px; */

`

const IncomeExpenditure = styled.div`
/* display: flex;
flex-direction: column;
width: 100%;
justify-content: space-between;
align-items: left; */

`
const IncomeRow = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 9px;
margin-right:20px;
margin-left: 3px;
cursor: pointer;

&::before {
    content: '';
    position: absolute;
    left: 21px;
    width: 2px; /* 세로 줄의 너비 설정 */
    height: 6%; /* 부모 요소의 높이에 맞게 설정 */
    background-color: #FF6565; /* 세로 줄의 색상 설정 */
  }

`;

const TagAndWho = styled.div`
  display: flex;
  align-items: flex-start;
flex-direction: column;


`;
const IncomeTag = styled.p`
margin-left: 30px;
/* display: flex; */
`;

const IncomeMoney = styled.p`
font-size: 15px;
/* display: flex; */
`;
const ExpenditureRow = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 9px;
margin-right:20px;
margin-left: 3px;
cursor: pointer;

&::before {
    content: '';
    position: absolute;
    left: 21px;
    width: 2px; /* 세로 줄의 너비 설정 */
    height: 6%; /* 부모 요소의 높이에 맞게 설정 */
    background-color: #2663FF; /* 세로 줄의 색상 설정 */
  }
`;
const ExpenditureTag = styled.p`
margin-left: 30px;
`

const ExpenditureWho = styled.div`
font-size: .5rem;
margin-top: 2px;

`;
const ExpenditureMoney = styled.div`
font-size: 15px;
`;

const CellClass = styled.div`
display: flex;
flex-direction: column;
align-items: center;
/* width: 50.71px; */
&.not-current-month {
    color: rgba(0, 0, 0, 0.2); /* 전달 및 다음달 날짜의 텍스트 색상을 회색으로 지정 */
}
&.selected {    
    width: 30px;
    height: 30px;
    background: rgba(255, 101, 101, 0.50);
    border-radius: 50%;
    z-index: 1;
    /* margin: 0 auto; */
}
`
const TextClass = styled.span`
width: 35px;
// display: flex;
// flex-direction: row;
// &.not-valid {
//         color: rgba(0, 0, 0, 0.2); /* 전달 및 다음달 날짜의 텍스트 색상을 회색으로 지정 */
//     }
`
const Row = styled.span`
padding-top: .5rem;
display: flex;
justify-content: space-between;
height: 3rem;

`
const IncomeText = styled.div`
display: flex;
flex-direction: column;
align-items: center;
color: #FF6565; /* 지출 텍스트 색상 */

/* font-weight: bold; */
font-size: .1rem;
`
const ExpenditureText = styled.div`
color: #2663FF; /* 수입 텍스트 색상 */
/* font-weight: bold; */
font-size: .1rem;
`
const RowsBody = styled.div`
// display: flex;
// flex-direction: column;

`
const AddButton = styled.p`

display: flex;
flex-direction: column;
align-items: right;
margin-right: 20px;
`

const TodayDot = styled.div`
    width: 30px;
    height: 30px;
    background-color: #FF6565; /* 원하는 색상으로 설정 */
    border-radius: 50%;
    z-index: 1;
    margin: 0 auto; 
    color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

`

const NotTodayDot = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    z-index: 1;
    margin: 0 auto; 
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`
const TodayDate = styled.p`
color: #000;
text-align: left;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: normal;   
margin-left: 18px;
`
const Horizonline = styled.div`
background: rgba(0, 0, 0, 0.20);
margin-top: 20px;
width: 100%;
height: 1.5px;
`
const today = new Date();

const AccountCalendar = () => {
    const navigate = useNavigate();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(today);
    const days = [];
    const date = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    // console.log(currentMonth)
    const requestData = format(currentMonth, 'yyyy-MM')
    const [responseData, setResponseData] = useState([]);
    const [maxDate, setMaxDate] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date());

    useEffect(() => {
        // 백틱으로 바꾸기
        const accessToken = localStorage.getItem("token");
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/${requestData}`,{
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
        })
        .then(response => {
        console.log(response)
        setResponseData(response.data.money_list);
        setMaxDate(response.data.max_date);
        setMinDate(response.data.min_date);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [requestData]);

    
    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i}>
                {date[i]}
            </div>,
        );
    }
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    const dataMap = responseData.reduce((map, item) => {
        map[item.date] = item;
        return map;
    }, {});

    let dates = [];
    let day = startDate;
    let formattedDate = '';
    const findItemsForSelectedDate = (selectedDate) => {
        const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd');
        const selectedDateData = responseData.find(item => item.date === formattedSelectedDate) || {
            income_list: [],
            expenditure_list: []
        };
        return selectedDateData;
      };
    
      const selectedDateData = findItemsForSelectedDate(selectedDate);
      const { income_list, expenditure_list } = selectedDateData;
    while (day <= endDate) {
        for (let i = 0; i < 7; i++) {
            formattedDate = format(day, 'yyyy-MM-dd');
            const cloneDay = day;
            const isToday = isSameDay(day, today); 
            const income = dataMap[formattedDate]?.income || 0;
            const expenditure = dataMap[formattedDate]?.expenditure || 0;

            const cellClass = `
                ${!isSameMonth(day, monthStart) ? 'disabled' : ''}
                ${isSameDay(day, selectedDate) ? 'selected' : ''}
                ${format(currentMonth, 'M') !== format(day, 'M') ? 'not-valid' : ''}
                ${isToday ? 'today' : ''}
                `;
                

            const textClass = `
                ${format(currentMonth, 'M') !== format(day, 'M') ? 'text not-valid' : ''}
                ${income > 0 ? 'income-text' : ''}
                ${expenditure > 0 ? 'expenditure-text' : ''}
            `;
    
            dates.push(
                <CellClass
                    className={cellClass}
                    key={formattedDate}
                    onClick={() => onDateClick(cloneDay)}
                >

                    <TextClass className={textClass}>
                    {isToday ? (
                            <TodayDot>
                                {formattedDate.split('-')[2]}
                            </TodayDot> // 동그란 원 추가
                        ) : 
                            <NotTodayDot>

                        <div>{formattedDate.split('-')[2]}</div>
                            </NotTodayDot>
                        }

                    <IncomeExpenditure>
                        <IncomeText>{income > 0 ? `+${income.toLocaleString()}` : ''}</IncomeText>
                        <ExpenditureText>{expenditure > 0 ? `-${expenditure.toLocaleString()}` : ''}</ExpenditureText>
                    </IncomeExpenditure>
                    </TextClass>

                </CellClass>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <Row key={formattedDate}>
                {dates}
            </Row>,
        );
        dates = [];
    }
    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        // console.log(day)
        setSelectedDate(day);
        // const formatday = format(day, 'yyyy-MM-dd');
        // console.log(formatday);
        //handleClick(formatday);
    };

    return (
        <Container>
            <CalendarHeader>
                <Col>
                    <span onClick={prevMonth}>←</span>
                        {format(currentMonth, 'M')}월
                    <span onClick={nextMonth}>→</span>
                </Col>
            <AddButton onClick={()=>navigate('/calendarinput')}>추가하기</AddButton>
            </CalendarHeader>
            <Box>
            <DaysClass>
                {days}
            </DaysClass>
            <RowsBody>
                {rows}
            </RowsBody>   
            </Box>


            <Horizonline />
                <TodayDate>{format(selectedDate, 'dd.eee요일', { locale: ko })}</TodayDate>
                <IncomeExpenditure>
                    {income_list.map(item => (
                        <IncomeRow key={item.income_id}>
                            {/* <TagAndWho> */}
                                <IncomeTag>{item.tag_name} </IncomeTag>
                            {/* </TagAndWho> */}
                            <IncomeMoney>{item.amount.toLocaleString()}원</IncomeMoney>
                        </IncomeRow>


                    ))}
                </IncomeExpenditure>

                <IncomeExpenditure>
                    {expenditure_list.map(item => (
                        <ExpenditureRow key={item.expenditure_id}>
                            {/* <TagAndWho> */}
                                <ExpenditureTag>{item.third_tag_name} </ExpenditureTag>
                            {/* </TagAndWho> */}
                            <IncomeMoney>{item.amount.toLocaleString()}원</IncomeMoney>
                        </ExpenditureRow>


                    ))}
                </IncomeExpenditure>
   
        
            
            {/* <IncomeExpenditure>
            {responseData && responseData.income_list.map((incomeItem) => (
            <IncomeRow key={incomeItem.income_id}>
              <TagAndWho>
                <IncomeTag>{incomeItem.tag_name}</IncomeTag>
                <IncomeWho>{incomeItem.role === 'BRIDE' ? '예비신부' : '예비신랑'}</IncomeWho>
              </TagAndWho>
              <IncomeMoney>+{incomeItem.amount.toLocaleString()}</IncomeMoney>
            </IncomeRow>
          ))}
          {responseData && responseData.expenditure_list.map((expenditureItem) => (
            <ExpenditureRow key={expenditureItem.expenditure_id}>
              <TagAndWho>
                <ExpenditureTag>{expenditureItem.first_tag_name}</ExpenditureTag>
                <ExpenditureWho>{expenditureItem.role === 'BRIDE' ? '예비신부' : '예비신랑'}</ExpenditureWho>
              </TagAndWho>
              <ExpenditureMoney>-{expenditureItem.amount.toLocaleString()}</ExpenditureMoney>
            </ExpenditureRow>
          ))}
        </IncomeExpenditure> */}
      
        </Container>
    );
};

export default AccountCalendar;