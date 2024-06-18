import React from "react";
import { Tabs, Button } from "antd";
import UserInfo from "./UserInfo";
import History from "./History";
import { useLocation } from "react-router-dom";

const items = [
  {
    key: "1",
    label: "THÔNG TIN TÀI KHOẢN",
    children: <UserInfo />,
  },
  {
    key: "2",
    label: "LỊCH SỬ GIAO DỊCH",
    children: <History />,
  },
];

const onChange = (key) => {
  };

export default function Account() {
  const location = useLocation();
  const activeTab = location.state?.activeTab || "1";
  return (
    <div className="py-20 px-6">
      <Tabs defaultActiveKey={activeTab} items={items} onChange={onChange} />
    </div>
  );
}
