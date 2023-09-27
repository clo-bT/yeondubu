import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import GlobalStyle from "./styles/GlobalStyle";
// import FirstMain from './components/Login/FirstMain';
// import HouseNaverMap from './components/HouseFind/HouseNaverMap';
// import CoupleImage from './components/Common/CoupleImage';
// import AccountInputMessage from './components/AccountInputStart/AccountInputMessage';
// import AccountInputHeader from './components/Common/AccountInputHeader';
// import DepositAccountInputForm from './components/AccountInput/DepositAccountInputForm';
// import WeddingDayInput from './components/WeddingDay/WeddingDayInput';
// import styled from 'styled-components';
// import ScoreInputHeader from './components/CreditScoreInput/ScoreInputHeader';
// import ScoreInput from './components/CreditScoreInput/ScoreInput';
// import LoginAuth from './components/KakaoLogin/LoginAuth';
// import Menubar from './components/Common/Menubar';
// import MyAccountProfile from './components/Common/MyAccountProfile';
import Main from './pages/Main';
// import MyPage from './pages/MyPage';
// import MyAccount from './pages/MyAccount';
// import MyAccountDetail from './pages/MyAccountDetail';
// import MyAccountUpdate from './pages/MyAccountUpdate';
// import MyProductLike from './pages/MyProductLike';
// import UserWithdraw from './pages/UserWithdraw';
// import WholeTab from './pages/WholeTab';
// import Mooni from './pages/Mooni';
// import WeddingDayUpdate from './pages/WeddingDayUpdate';
// import CreditScoreInput from './pages/CreditScoreInput';
// import CheckBox from './pages/CheckBox';
import CreditScoreInput from './pages/CreditScoreInput';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`); //"--vh"라는 속성으로 정의해준다.
  }

  window.addEventListener('resize', () => setScreenSize());
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/input" element={<CreditScoreInput />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

