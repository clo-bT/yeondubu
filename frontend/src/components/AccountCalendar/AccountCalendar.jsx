import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays } from 'date-fns';
import './AccountCalendar.css'
// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; 

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


const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
    return (
        <div className="header row">
            <div className="col col-start">
                <span className="text">
                    
                    {/* {format(currentMonth, 'yyyy')} */}
                </span>
            </div>
            <div className="col">
                <span onClick={prevMonth}>←</span>
                <span className="text month">
                        {format(currentMonth, 'M')}월
                    </span>
                <span onClick={nextMonth}>→</span>
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


    const dataMap = responseData.reduce((map, item) => {
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





const AccountCalendar = ({ onDateClick : handleClick }) => {
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
        </div>
    );
};

export default AccountCalendar;