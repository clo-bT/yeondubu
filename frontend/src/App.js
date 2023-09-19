import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import GlobalStyle from "./styles/GlobalStyle";
import FirstMain from './components/Login/FirstMain';
// import HouseNaverMap from './components/HouseFind/HouseNaverMap';
// import CoupleImage from './components/Common/CoupleImage';
// import AccountInputMessage from './components/AccountInputStart/AccountInputMessage';
// import AccountInputHeader from './components/Common/AccountInputHeader';
// import DepositAccountInputForm from './components/AccountInput/DepositAccountInputForm';
import WeddingDayInput from './components/WeddingDay/WeddingDayInput';
// import styled from 'styled-components';
// import ScoreInputHeader from './components/CreditScoreInput/ScoreInputHeader';
// import ScoreInput from './components/CreditScoreInput/ScoreInput';
import LoginAuth from './components/KakaoLogin/LoginAuth';
import AccountCalendar from './pages/AccountCalendar';


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
          <Route path="/" element={<FirstMain />} />
          <Route path="/auth" element={<LoginAuth />} />
          <Route path="/main" element={<WeddingDayInput />} />
          <Route path="/calendar" element={<AccountCalendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

