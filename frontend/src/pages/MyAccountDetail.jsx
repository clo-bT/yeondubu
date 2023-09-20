import React from 'react';
import MyAccountProfile from '../components/Common/MyAccountProfile';
import MyAccountContent from '../components/MyAccountDetail/MyAccountContent';
import Menubar from '../components/Common/Menubar';

const MyAccountDetail = () => {
    return (
        <div>
            <MyAccountProfile />
            <MyAccountContent/>
            <Menubar/>

        </div>
    );
};

export default MyAccountDetail;