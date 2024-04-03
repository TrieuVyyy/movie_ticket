import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Header from "./component/Header/Header";
import DetailPage from "./pages/DetailPage/DetailPage";
import Layout from "./component/Header/layout/Layout";
import SeatMovie from "./pages/SeatMovie/SeatMovie";
import Spinner from "./component/Spinner/Spinner";
import AdUserPage from "./pages/AdUserPage/AdUserPage";
import SecureGate from "./component/Header/layout/SecureGate";
import AdminLayout from "./component/Header/layout/Admin";
import SignupPage from "./pages/SignupPage/SignupPage";

function App() {
  return (
    <>
      <Spinner />
      <BrowserRouter>
        {/* Header */}
        <Routes>
          {/* users  */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/detail/:maPhim" element={<DetailPage />} />
          </Route>

          {/* admin  */}
          <Route
            path="/admin"
            element={
              <SecureGate>
                <AdminLayout />
              </SecureGate>
            }
          >
            <Route path="users" element={<AdUserPage />} />
          </Route>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/checkout" element={<SeatMovie />}/> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
