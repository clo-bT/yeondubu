import React from 'react';
import ShopCategoryHeader from '../components/ShoppingMall/ShopCategoryHeader';
import ShoppingList from '../components/ShoppingMall/ShoppingList';

const ShoppingMall = () => {
    return (
        <div>
            <ShopCategoryHeader />
            <ShoppingList />
        </div>
    );
};

export default ShoppingMall;