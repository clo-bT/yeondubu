import React from 'react';
import CheckListUpdate from '../components/CheckBox/CheckListUpdate';
import CheckListUpdateHeader from '../components/CheckBox/CheckListUpdateHeader';
import Menubar from '../components/Common/Menubar';

const CheckBox = () => {
    return (
        <div>
            <CheckListUpdateHeader/>
            <CheckListUpdate />
            <Menubar />
        </div>
    );
};

export default CheckBox;