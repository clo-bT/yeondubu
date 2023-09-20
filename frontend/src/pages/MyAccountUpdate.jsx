import React from 'react';
import Menubar from '../components/Common/Menubar';
import MyAccountProfile from '../components/Common/MyAccountProfile';
import MyAccountUpdateDetail from '../components/MyAccountUpdate/MyAccountUpdateDetail';


const MyAccountUpdate = () => {
    return (
        <div>
            <MyAccountProfile />
            <MyAccountUpdateDetail />
            <Menubar />
        </div>
    );
};

export default MyAccountUpdate;