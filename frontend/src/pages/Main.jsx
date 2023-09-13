import { React, useState } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';



const Main = () => {
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);

  const handleBudgetMoneyScroll = (isOpen) => {
    setIsBudgetOpen(isOpen);
  };

    return (
      <div>
        <BudgetMoney isBudgetOpen={isBudgetOpen} />
        <CoupleImage onScroll={handleBudgetMoneyScroll} isBudgetOpen={isBudgetOpen}/>
        <CoupleMoney/>
        <Menubar />
        </div>
    );
};

export default Main;