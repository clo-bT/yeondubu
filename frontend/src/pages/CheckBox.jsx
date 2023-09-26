import React from 'react';
import CheckListUpdate from '../components/CheckBox/CheckListUpdate';
import CheckListUpdateHeader from '../components/CheckBox/CheckListUpdateHeader';

const CheckBox = () => {
    return (
        <div>
            <CheckListUpdateHeader/>
            <CheckListUpdate />
        </div>
    );
};

export default CheckBox;