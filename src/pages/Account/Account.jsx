import React, { Children, useEffect, useState } from "react";
import { Tabs, Button, message } from "antd";
import UserInfo from "./UserInfo";
import History from "./History";
import { useLocation } from "react-router-dom";
import { https } from "../../service/api";

export default function Account() {
  const location = useLocation();
  const activeTab = location.state?.activeTab || "1";
  const [accountInfor, setAccountInfor] = useState(null);

  const fetchAccountInfor = () => {
    https
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        setAccountInfor(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAccountInfor();
  }, []);

  const items = [
    {
      key: "1",
      label: "THÔNG TIN TÀI KHOẢN",
      children: (
        <UserInfo
          accountInfor={accountInfor}
          setAccountInfor={setAccountInfor}
        />
      ),
    },
    {
      key: "2",
      label: "LỊCH SỬ GIAO DỊCH",
      children: <History thongTinDatVe={accountInfor?.thongTinDatVe} />,
    },
  ];

  return (
    <div className="py-20 px-6">
      <Tabs defaultActiveKey={activeTab} items={items} />
    </div>
  );
}
