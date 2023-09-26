import { React } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Page from './Page';



function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/page" element={<Page />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

