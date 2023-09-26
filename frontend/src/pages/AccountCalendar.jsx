import React, { useState } from 'react';
import { format } from 'date-fns';
import AccountCalendar from '../components/AccountCalendar/AccountCalendar';
import AccountCalendarModal from '../components/AccountCalendarModal/AccountCalendarDetail';

const CalendarPage = () => {
    const today = new Date();
    const formattedday = format(today, 'yyyy-MM-dd');

    const [formatday, setFormatday] = useState(formattedday);

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
