import React from 'react';
import ShopCategoryHeader from '../components/ShoppingMall/ShopCategoryHeader';
import ShoppingList from '../components/ShoppingMall/ShoppingList';
import Menubar from '../components/Common/Menubar';

const ShoppingMall = () => {
    return (
        <div>
            <ShopCategoryHeader />
            <ShoppingList />
            <Menubar />
        </div>
    );
};

export default ShoppingMall;