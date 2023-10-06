import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import GlobalStyle from "./styles/GlobalStyle";
import AccountCalendar from './pages/AccountCalendar';
import AccountInput from './pages/AccountInput';
import AccountInputStart from './pages/AccountInputStart';
import AirlineRecommend from './pages/AirlineRecommend';
import AirlineRecommendFilter from './pages/AirlineRecommendFilter';
import BudgetCheckBox from './pages/BudgetCheckBox';
import CalendarInputCreate from './pages/CalendarInputCreate';
import CalendarInputUpdate from './pages/CalendarInputUpdate';
import ChatBot from './pages/ChatBot';
import CheckBox from './pages/CheckBox';
import CheckUser from './pages/CheckUser';
import Invite from './pages/Invite';
import InvitePageEnterCode from './pages/InvitePageEnterCode';
import KakaoLogin from './pages/KakaoLogin';
import Login from './pages/Login';
import Main from './pages/Main';
import Mooni from './pages/Mooni';
import PutShoppingImage from './pages/PutShoppingImage';
import ShopingMallCategory from './pages/ShoppingMallCategory';
import ShoppingMall from './pages/ShoppingMall';
import ShoppingRecommendation from './pages/ShoppingRecommendation';
import ShoppingFilter from './components/PutShoppingImage/ShoppingFilter';
import ShoppingSizeInput from './pages/ShoppingSizeInput';
import ShowInviteCode from './pages/ShowInviteCode';
import TagInput from './pages/TagInput';
import WeddingDay from './pages/WeddingDay';
import WholeTab from './pages/WholeTab';
import MyPage from './pages/MyPage';
import MyAccount from './pages/MyAccount';
import MyAccountDetail from './pages/MyAccountDetail';
import MyProductLike from './pages/MyProductLike';
import CreditScoreInput from './pages/CreditScoreInput';
import MyAccountUpdate from './pages/MyAccountUpdate';
import CheckBoxWhole from './pages/CheckBoxWhole';
import UserWithdraw from './pages/UserWithdraw';
import MyPageAccountInput from './pages/MyPageAccountInput';
import CalendarUpdateIncome from './pages/CalendarUpdateIncome';


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
          <Route path="/calendar" element={<AccountCalendar />} />
          <Route path="/accountinput" element={<AccountInput />} />
          <Route path="/accountinputstart" element={<AccountInputStart />} />
          <Route path="/airlinerecommend" element={<AirlineRecommend />} />
          <Route path="/airlinerecommendfilter" element={<AirlineRecommendFilter />} />
          <Route path="/budgetcheckbox" element={<BudgetCheckBox />} />
          <Route path="/calendarinput" element={<CalendarInputCreate />} />
          <Route path="/calendarupdate/:tagId" element={<CalendarInputUpdate />} />
          <Route path="/calendarupdateincome/:tagId" element={<CalendarUpdateIncome />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/checkbox" element={<CheckBox />} />
          <Route path="/checkboxwhole" element={<CheckBoxWhole />} />
          <Route path="/checkuser" element={<CheckUser />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/invitepageentercode" element={<InvitePageEnterCode />} />
          <Route path="/auth" element={<KakaoLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mooni" element={<Mooni />} />
          <Route path="/putshoppingimage" element={<PutShoppingImage />} />
          <Route path="/shoppingmallcategory" element={<ShopingMallCategory />} />
          <Route path="/shoppingmall/:category/:subcategory" element={<ShoppingMall />} />
          <Route path="/shoppingfilter/:category/:subcategory" element={<ShoppingFilter />} />
          <Route path="/shoppingrecommendation/:category/:subcategory" element={<ShoppingRecommendation />} />
          <Route path="/shoppingsizeinput" element={<ShoppingSizeInput />} />
          <Route path="/showinvitecode" element={<ShowInviteCode />} />
          <Route path="/taginput" element={<TagInput />} />
          <Route path="/weddingday" element={<WeddingDay />} />
          <Route path="/wholetab" element={<WholeTab />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/myaccountdetail/:accountId" element={<MyAccountDetail />} />
          <Route path="/myproduct" element={<MyProductLike />} />
          <Route path="/input" element={<CreditScoreInput />} />
          <Route path="/myproductlike" element={<MyProductLike />} />
          <Route path="/myaccountupdate/:accountType/:accountId" element={<MyAccountUpdate />} />
          <Route path="/checkboxwhole" element={<CheckBoxWhole />} />
          <Route path="/userwithdraw" element={<UserWithdraw />} />
          <Route path="/mypageaccountinput" element={<MyPageAccountInput />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

