import React from 'react';
import ShoppingHeader from '../components/ShoppingMallCategory/ShoppingHeader';
import ShoppingCategoryList from '../components/ShoppingMallCategory/ShoppingCategoryList';
import Menubar from '../components/Common/Menubar';


const ShoppingMallCategory = () => {
    return (
        <div>
            <ShoppingHeader />
            <ShoppingCategoryList />
            <Menubar />
        </div>
    );
};

export default ShoppingMallCategory;