import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import Header from './component/Header/Header';
import DetailPage from './pages/DetailPage/DetailPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element= {<HomePage />} />
          <Route path='/login' element = {<LoginPage />} />
          <Route path='/detail/:maPhim' element = {<DetailPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
