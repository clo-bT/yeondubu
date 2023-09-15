import { React, useState } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';
import LoanRecommend from '../components/Main/LoanRecommend';



const Main = () => {
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);

    return (
      <div>
        <BudgetMoney isBudgetOpen={isBudgetOpen} />
        <CoupleImage setIsBudgetOpen={setIsBudgetOpen} isBudgetOpen={isBudgetOpen}/>
        <CoupleMoney/>
        <LoanRecommend/>
        <Menubar />
        </div>
    );
};

export default Main;