import  React, {useState, useEffect } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';
import LoanRecommend from '../components/Main/LoanRecommend';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BudgetGraph from '../components/Main/BudgetGraph';



const Main = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const partner_id = localStorage.getItem("partner_id");
    const role = localStorage.getItem("role");
    if (!accessToken) {
      navigate('/login')
    }
    else if (!partner_id) {
      navigate('/invite')
    }
    else if (!role) {
      navigate('/weddingday')
    }
    else {
      navigate('/')

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
        <BudgetGraph/>
        <LoanRecommend isLoanOpen={isLoanOpen} toggleLoan={toggleLoan}/>
        <Menubar />
      </div>
    );
};

export default Main;