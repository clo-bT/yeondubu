import React from 'react';
import MyAccountContent from '../components/MyAccountDetail/MyAccountContent';
import Menubar from '../components/Common/Menubar';
import MyAccountDetailHeader from '../components/MyAccountDetail/MyAccountDetailHeader';

const MyAccountDetail = () => {
    return (
        <div>
            <MyAccountDetailHeader />
            <MyAccountContent/>
            <Menubar/>

        </div>
    );
};

export default MyAccountDetail;