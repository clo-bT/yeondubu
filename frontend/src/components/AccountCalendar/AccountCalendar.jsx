import React, { useState } from 'react';
import styled from 'styled-components';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
// import './AccountCalendar.css'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

const CalendarPage = styled.div`
width: 393px;
height: 852px;
`
const CalendarHeader = styled.div`
display: flex;
justify-content: space-between;
/* padding: 10px; */
background-color: #f0f0f0;
font-size: 18px;
font-weight: bold;

`
const Col = styled.div`
flex: 1;
text-align: center;
padding: 5px;
cursor: pointer;
`
const TextMonth = styled.span`
font-size: 20px;
font-weight: bold;
flex-direction: column;

`
const DaysRow = styled.div`
display: flex;
justify-content: space-between;
/* padding: 10px 20px; */
background-color: #f2f2f2;

`
const IncomeExpenditure = styled.div`
flex-direction: column;

`
const CellClass = styled.div`
display: flex;
flex-direction: column;
align-items: center;
width: 56.14px;

`
const TextClass = styled.span`
display: flex;
flex-direction: row;

`
const Row = styled.span`
padding-top: .5rem;
display: flex;
flex-direction: row;
justify-content: space-between;
height: 3rem;

`
const IncomeText = styled.div`
color: #4caf50; /* 수입 텍스트 색상 */
/* font-weight: bold; */
font-size: .1rem;
`
const ExpenditureText = styled.div`
color: #f44336; /* 지출 텍스트 색상 */
/* font-weight: bold; */
font-size: .1rem;
`
const RowsBody = styled.div`
display: flex;
flex-direction: column;

`

const responseData = [
    
    {
        "date": "2023-09-01",
        "income": 5000000,
        "expenditure": 0
    },
    {
        "date": "2023-09-02",
        "income": 0,
        "expenditure": 500000
    },
    {
        "date": "2023-09-03",
        "income": 0,
        "expenditure": 700000
    },
    {
        "date": "2023-09-04",
        "income": 0,
        "expenditure": 2000
    },
    {
        "date": "2023-09-05",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-06",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-07",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-09",
        "income": 0,
        "expenditure": 700000
    },
    {
        "date": "2023-09-09",
        "income": 80000,
        "expenditure": 0
    },
    {
        "date": "2023-09-10",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-11",
        "income": 270000,
        "expenditure": 0
    },
    {
        "date": "2023-09-12",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-13",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-14",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-15",
        "income": 340000,
        "expenditure": 0
    },
    {
        "date": "2023-09-16",
        "income": 0,
        "expenditure": 34000
    },
    {
        "date": "2023-09-17",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-18",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-19",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-20",
        "income": 0,
        "expenditure": 680000
    },
    {
        "date": "2023-09-21",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-22",
        "income": 0,
        "expenditure": 23000
    },
    {
        "date": "2023-09-23",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-24",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-25",
        "income": 0,
        "expenditure": 60000
    },
    {
        "date": "2023-09-26",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-27",
        "income": 0,
        "expenditure": 0
    },
    {
        "date": "2023-09-28",
        "income": 1000000,
        "expenditure": 10000
    },
    {
        "date": "2023-09-29",
        "income": 0,
        "expenditure": 4500000
    },
    {
        "date": "2023-09-30",
        "income": 0,
        "expenditure": 0
    }
    

];

const today = new Date();

const AccountCalendar = ({ onDateClick : handleClick }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <Col key={i}>
                {date[i]}
            </Col>,
        );
    }
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);


    const dataMap = responseData.reduce((map, item) => {
        map[item.date] = item;
        return map;
    }, {});

    const rows = [];
    let dates = [];
    let day = startDate;
    let formattedDate = '';

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
                    {isToday && (
                        <div className="todaydot">{formattedDate.split('-')[2]}</div> // 동그란 원 추가
                        )}
                    {!isToday && (
                        <div>{formattedDate.split('-')[2]}</div>
                        
                        )}
                    </TextClass>

                    <IncomeExpenditure>
                        <IncomeText>{income > 0 ? `+ ${income.toLocaleString()}` : ''}</IncomeText>
                        <ExpenditureText>{expenditure > 0 ? `- ${expenditure.toLocaleString()}` : ''}</ExpenditureText>
                    </IncomeExpenditure>

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
        const formatday = format(day, 'yyyy-MM-dd');
        // console.log(formatday);
        handleClick(formatday);
    };
        // console.log(currentMonth)
        // const requestData = format(currentMonth, 'yyyy-MM')
        // console.log('currentYear',requestData)
        
        // const [responseData, setResponseData] = useState([]);
        // useEffect(() => {
        //     // 백틱으로 바꾸기
        //     axios.get($`/api/v1/cash?yearMonth={yyyy-MM}`)
        //     .then(response => {
        //         setResponseData(response.data);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });
        // }, []);
        
    return (
        <CalendarPage>
            <CalendarHeader>
                <Col>
                    <span onClick={prevMonth}>←</span>
                    <TextMonth>
                        {format(currentMonth, 'M')}월
                    </TextMonth>
                    <span onClick={nextMonth}>→</span>
                </Col>
            </CalendarHeader>
            <DaysRow>
                {days}
            </DaysRow>
            <RowsBody>
                {rows}
            </RowsBody>
        </CalendarPage>
    );
};

export default AccountCalendar;