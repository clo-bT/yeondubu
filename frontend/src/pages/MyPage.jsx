import React from 'react';
import MyPageHeader from '../components/MyPage/MyPageHeader';
import MyPageList from '../components/MyPage/MyPageList';
import Menubar from '../components/Common/Menubar';

const MyPage = () => {
    return (
        <div>
            <MyPageHeader />
            <MyPageList />
            <Menubar/>
        </div>
    );
};

export default MyPage;