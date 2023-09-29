import  React, {useState, useEffect } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';
import LoanRecommend from '../components/Main/LoanRecommend';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const partner_id = localStorage.getItem("partner_id");
    if (!accessToken) {
      navigate('/login')
    }
    else if (!partner_id) {
      navigate('/invite')
    }
    
  },[navigate])
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