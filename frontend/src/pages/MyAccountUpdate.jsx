import React from 'react';
import Menubar from '../components/Common/Menubar';
import MyAccountUpdateDetail from '../components/MyAccountUpdate/MyAccountUpdateDetail';
import MyAccountUpdateHeader from '../components/MyAccountUpdate/MyAccountUpdateHeader';


const MyAccountUpdate = () => {
    return (
        <div>
            <MyAccountUpdateHeader />
            <MyAccountUpdateDetail />
            <Menubar />
        </div>
    );
};

export default MyAccountUpdate;