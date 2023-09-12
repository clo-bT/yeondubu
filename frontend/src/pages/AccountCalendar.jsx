import React, { useState } from 'react';
import AccountCalendar from '../components/AccountCalendar/AccountCalendar';
import AccountCalendarModal from '../components/AccountCalendarModal/AccountCalendarDetail';

const CalendarPage = () => {
    const [formatday, setFormatday] = useState(null);

    const handleDateClick = (formatday) => {
        setFormatday(formatday);
    };

    return (
        <div>
            <AccountCalendar onDateClick={handleDateClick} />
            <AccountCalendarModal formatday={formatday} />
        </div>
    );
};

export default CalendarPage;
