import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import Layout from "./component/Header/layout/Layout";
import Spinner from "./component/Spinner/Spinner";
import SecureGate from "./component/Header/layout/SecureGate";
import AdminLayout from "./component/Header/layout/Admin";
import AdUserPage from "./pages/AdUserPage/AdUserPage";
import AddUser from "./pages/AdUserPage/AddUser";
import CheckOut from "./pages/Checkout/Checkout";
import FilmsPage from "./pages/AdFilmPage/FilmsPage";
import AddFilmPage from "./pages/AdFilmPage/AddFilmPage";
import EditFilm from "./pages/AdFilmPage/EditFilm";
import CreateShowTime from "./pages/CreateShowTime/CreateShowTime";
import Account from "./pages/Account/Account";
import EditUser from "./pages/AdUserPage/EditUser";

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
            <Route path="/account/:taiKhoan" element={<Account />} />
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
            <Route path="adduser" element={<AddUser />} />
            <Route path="films" element={<FilmsPage />} />
            <Route path="addfilm" element={<AddFilmPage />} />
            <Route path="edituser/:taiKhoan" element={<EditUser />} />
            <Route path="editfilm/:maPhim" element={<EditFilm />} />
            <Route path="showtime/:maPhim" element={<CreateShowTime />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
