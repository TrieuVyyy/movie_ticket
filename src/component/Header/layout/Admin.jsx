import React, { useState } from "react";
import {
  FileOutlined,
  FolderOutlined,
  UserOutlined,
  PlusCircleOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";
const { Content, Sider } = Layout;
const items = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: <Link to="/admin/users">User</Link>,
  },
  {
    key: "files",
    icon: <FileOutlined />,
    label: "Files",
    children: [
      {
        key: "films",
        icon: <FolderOutlined />,
        label: <Link to="/admin/films">Films</Link>,
      },
      {
        key: "addFilm",
        icon: <PlusCircleOutlined />,
        label: <Link to="/admin/add">Add Film</Link>,
      },
    ],
  },
  {
    key: "showtimes",
    icon: <DesktopOutlined />,
    label: "Show Time",
  },
];

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* <Header>
      </Header> */}
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
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
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

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
