import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./component/Header/Header";
import DetailPage from "./pages/DetailPage/DetailPage";
import Layout from "./layout/Layout";
import SeatMovie from "./pages/SeatMovie/SeatMovie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}> 
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:maPhim" element={<DetailPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seat" element={<SeatMovie />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
