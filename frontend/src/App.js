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
// import WeddingDayInput from './components/WeddingDay/WeddingDayInput';
// import styled from 'styled-components';
// import ScoreInputHeader from './components/CreditScoreInput/ScoreInputHeader';
// import ScoreInput from './components/CreditScoreInput/ScoreInput';
import LoginAuth from './components/KakaoLogin/LoginAuth';
// import Menubar from './components/Common/Menubar';
// import MyAccountProfile from './components/Common/MyAccountProfile';
import Main from './pages/Main';
import CodeInput from './components/Invite/CodeInput';
import InvitationCode from './components/ShowInviteCode/InvitationCode';

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
          <Route path="/login" element={<FirstMain />} />
          <Route path="/auth" element={<LoginAuth />} />
          <Route path="/input" element={<CodeInput />} />
          <Route path="/invite" element={<InvitationCode />} />
            
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

