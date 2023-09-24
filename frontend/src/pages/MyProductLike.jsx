import React from 'react';
import MyProductLikeDetail from '../components/MyProductLike/MyProductLikeDetail';
import MyProductLikeHeader from '../components/MyProductLike/MyProductLikeHeader';
import Menubar from '../components/Common/Menubar';

const MyProductLike = () => {
    return (
        <div>
            <MyProductLikeHeader />
            <MyProductLikeDetail />
            <Menubar/>

        </div>
    );
};

export default MyProductLike;