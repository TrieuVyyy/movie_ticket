import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import Layout from "./component/Header/layout/Layout";
import Spinner from "./component/Spinner/Spinner";
import AdUserPage from "./pages/AdUserPage/AdUserPage";
import SecureGate from "./component/Header/layout/SecureGate";
import AdminLayout from "./component/Header/layout/Admin";
import SignupPage from "./pages/SignupPage/SignupPage";
import CheckOut from "./pages/Checkout/Checkout";

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
            <Route path="/checkout/:maLichChieu" element={<CheckOut />} />
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
            <Route path="" element={<AdUserPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
