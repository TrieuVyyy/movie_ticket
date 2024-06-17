import React from "react";
import {
  FileOutlined,
  FolderOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const { Content, Sider } = Layout;
const items = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "Quản lý người dùng",
    children: [
      {
        key: "User List",
        icon: <FolderOutlined />,
        label: <Link to="/admin/users">Danh sách</Link>,
      },
      {
        key: "addUser",
        icon: <PlusCircleOutlined />,
        label: <Link to="/admin/adduser">Thêm</Link>,
      },
    ],
  },
  {
    key: "files",
    icon: <FileOutlined />,
    label: "Quản lý phim",
    children: [
      {
        key: "films",
        icon: <FolderOutlined />,
        label: <Link to="/admin/films">Danh sách phim</Link>,
      },
      {
        key: "addFilm",
        icon: <PlusCircleOutlined />,
        label: <Link to="/admin/addfilm">Thêm phim</Link>,
      },
    ],
  },
];

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  let { user } = useSelector((state) => state.userSlice);
  let handleLogout = () => {
    //xoá localStorage
    localStorage.removeItem("USER_INFOR");
    window.location.reload();
  };
  let renderMenu = () => {
    let cssBtn = "text-gray-500 hover:text-black";
    if (user) {
      // đã đăng nhập
      return (
        <div className="grid grid-rows-2 space-y-2">
          Xin chào <span className="uppercase text-gray-500">{user.hoTen}</span>
          <button className={cssBtn} onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
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
        </>
      );
    }
  };

  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <div className="text-center py-5">{renderMenu()}</div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["user"]}
            defaultOpenKeys={["files"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[
              {
                title: <Link to="/">Home</Link>,
              },
              { title: "Admin" },
            ]}
          />

          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
