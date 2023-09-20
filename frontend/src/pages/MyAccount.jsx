import React from 'react';
import Menubar from '../components/Common/Menubar';
import MyAccountHeader from '../components/MyAccount/MyAccountHeader';
import MyAccountList from '../components/MyAccount/MyAccountList';


const MyAccount = () => {
    return (
        <div>
            <MyAccountHeader />
            <MyAccountList />
            <Menubar />
        </div>
    );
};

export default MyAccount;