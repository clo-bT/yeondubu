import  React, {useState, useEffect } from 'react';
import BudgetMoney from '../components/Main/BudgetMoney';
import CoupleImage from '../components/Common/CoupleImage';
import Menubar from '../components/Common/Menubar';
import CoupleMoney from '../components/Main/CoupleMoney';
import LoanRecommend from '../components/Main/LoanRecommend';
//import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BudgetGraph from '../components/Main/BudgetGraph';
import axios from 'axios';


const Main = () => {
  const accessToken = localStorage.getItem('token')
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_ROOT}/api/v1/users`, {
      headers: {
          Authorization: `Bearer ${accessToken}`,
      },
    }).then((response)=> {
      console.log(response.data.name)
      console.log(response.data.user_role)
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("image", response.data.image_url);
      localStorage.setItem("is_couple", response.data.is_couple);
      // if (response.data.is_couple==='false') {
      //   navigate('/invite')
      // }
      if (response.data.user_role !=='BRIDE' && response.data.user_role !== 'GROOM') {
        navigate('/weddingday')
      }
      localStorage.setItem("role", response.data.user_role);
  }).catch((error)=>{
  console.error('Error fetching data:', error);
})
},[accessToken, navigate])
    useEffect(() => {
    
      if (!accessToken) {
        navigate('/login')
      }
     
    }, [accessToken, navigate])
  
    
    

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