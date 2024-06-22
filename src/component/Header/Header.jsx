import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown } from "antd";

export default function Header() {
  let { user } = useSelector((state) => state.userSlice);
  let handleLogout = () => {
    //xoá localStorage
    localStorage.removeItem("USER_INFOR");
    window.location.reload();
  };

  const items = user ? [
    {
      key: "1",
      label: <NavLink to={`/account/${user.taiKhoan}`}>Tài khoản</NavLink>,
      icon: <SettingOutlined />,
    },
   
    {
      key: "2",
      label: <a onClick={handleLogout}>Đăng xuất</a>,
      icon: <LogoutOutlined />,
    },
  ] : [];

  let renderMenu = () => {
    let cssBtn = "rounded px-3 py-1 border-2 border-white text-white";
    if (user) {
      // đã đăng nhập
      return (
        <>
          <span className="text-white">
            Xin chào <span className="uppercase">{user.hoTen}</span> !
          </span>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar size={52} icon={<UserOutlined />} />
          </Dropdown>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className={cssBtn}
          >
            Đăng nhập
          </button>
          <NavLink to="/signup" className={cssBtn}>
            Đăng ký
          </NavLink>
        </>
      );
    }
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-40 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <NavLink
          to="/"
          aria-label="Back to homepage"
          className="logo flex items-center"
        >
          <h1 className="inline-block text-3xl font-extrabold text-amber-400">
            VT
          </h1>
          <h1 className="text-3xl font-extrabold text-white">CINEMA</h1>
        </NavLink>
        <nav className="navigation">
          <a href="#listphim">Phim</a>
          <a href="#hethong">Hệ thống rạp</a>
          <a href="#lienhe">Liên hệ</a>
          <a href="/admin/users">Admin Page</a>
        </nav>
        <div className="flex items-center space-x-2">{renderMenu()}</div>
      </div>
    </header>
  );
}
