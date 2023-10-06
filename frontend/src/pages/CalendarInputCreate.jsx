import React from 'react';
import Menubar from '../components/Common/Menubar';
import CalendarInput from '../components/CalendarInputCreate/CalendarInput'

const CalendarInputCreate = () => {
    return (
        <div>
            <CalendarInput/>
            <Menubar />
        </div>
    );
};

export default CalendarInputCreate;