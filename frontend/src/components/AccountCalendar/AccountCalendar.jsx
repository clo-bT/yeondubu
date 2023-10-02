import React, { useEffect, useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import axios from 'axios';


const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    
                    {/* {format(currentMonth, 'yyyy')} */}
                </span>
            </div>
            <div className="col">
                <div onClick={prevMonth} />
                <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                <div onClick={nextMonth} />
            </div>
        </div>
    );
};

const RenderDays = () => {
    const days = [];
    const date = ['일', '월', '화', '수', '목', '금', '토'];

    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col" key={i}>
                {date[i]}
            </div>,
        );
    }

    return <div className="days row">{days}</div>;
};


const today = new Date();



const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const formatday = format(today, 'yyyy-MM');

    const [responsedata, setResponsedata] = useState([])
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/money/${formatday}`,
        {
            headers:{
                Authorization: `Bearer ${accessToken}`,
            }
        }).then((response) => {
            console.log(response.data);
            setResponsedata(response.data)
        }).catch((error) => {
            console.error(error);
        })
    },[formatday])
    
    const dataMap = responsedata.reduce((map, item) => {
        map[item.date] = item;
        return map;
    }, {});

    const rows = [];
    let days = [];
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
                col cell 
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
    
            days.push(
                <div
                    className={cellClass}
                    key={formattedDate}
                    onClick={() => onDateClick(cloneDay)}
                >
                    <span className={textClass}>
                    {isToday && (
                    <div className="todaydot">{formattedDate.split('-')[2]}</div> // 동그란 원 추가
                        )}
                    {!isToday && (
                    <div>{formattedDate.split('-')[2]}</div>
                    
                    )}
                    </span>

                    <div className={`income-expenditure ${income > 0 ? 'income' : expenditure > 0 ? 'expenditure' : ''}`}>
                        <div className='incometext'>{income > 0 ? `+ ${income.toLocaleString()}원` : ''}</div>
                        <div className='expendituretext'>{expenditure > 0 ? `- ${expenditure.toLocaleString()}원` : ''}</div>
                    </div>

                </div>,
            );
            day = addDays(day, 1);
        }
        rows.push(
            <div className="row" key={formattedDate}>
                {days}
            </div>,
        );
        days = [];
    }
    return <div className="body">{rows}</div>;
};





const AccountCalendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const prevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    const onDateClick = (day) => {
        // console.log(day)
        const formatday = format(day, 'yyyy-MM');
        console.log(formatday)
        setSelectedDate(day);
    };
    const handleModalOpen = ()  => {
        
    };
    return (
        <div className="calendar">
            <RenderHeader
                currentMonth={currentMonth}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
            <RenderDays />
            <RenderCells
                currentMonth={currentMonth}
                selectedDate={selectedDate}
                onDateClick={onDateClick}
            />
            <div onClick={handleModalOpen}>추가하기</div>
        </div>
    );
};

export default AccountCalendar;