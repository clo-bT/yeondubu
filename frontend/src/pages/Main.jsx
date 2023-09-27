import { React, useState } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';
import LoanRecommend from '../components/Main/LoanRecommend';



const Main = () => {
  const [isBudgetOpen, setIsBudgetOpen] = useState(true);
  const [isLoanOpen, setIsLoanOpen] = useState(false);
  
  const toggleLoan = () => {
    setIsLoanOpen(!isLoanOpen);
  };

  
    return (
      <div>
        <BudgetMoney isBudgetOpen={isBudgetOpen} />
        <CoupleImage setIsBudgetOpen={setIsBudgetOpen} isBudgetOpen={isBudgetOpen}/>
        <CoupleMoney/>
        <LoanRecommend isLoanOpen={isLoanOpen} toggleLoan={toggleLoan}/>
        <Menubar />
        </div>
    );
};

export default Main;