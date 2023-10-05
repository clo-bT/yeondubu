import React from 'react';
import CheckBoxHeader from '../components/CheckBoxWhole/CheckBoxHeader';
import CheckBoxWholeContent from '../components/CheckBoxWhole/CheckBoxWholeContent';
import Menubar from '../components/Common/Menubar';

const CheckBoxWhole = () => {
    return (
        <div>
            <CheckBoxHeader/>
            <CheckBoxWholeContent/>
            <Menubar/>
        </div>
    );
};

export default CheckBoxWhole;