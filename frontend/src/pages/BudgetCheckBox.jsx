import React from 'react';
import CheckListHeader from '../components/Common/CheckListHeader';
import CheckList from '../components/BudgetCheckBox/CheckList';
import Menubar from '../components/Common/Menubar'

const BudgetCheckBox = () => {
    return (
        <div>
            <CheckListHeader />
            <CheckList />
            <Menubar />
        </div>
    );
};

export default BudgetCheckBox;