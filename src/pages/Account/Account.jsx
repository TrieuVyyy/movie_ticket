import React, { useEffect, useState } from "react";
import { Tabs, Button, message } from "antd";
import UserInfo from "./UserInfo";
import History from "./History";
import { useLocation } from "react-router-dom";
import { https } from "../../service/api";

export default function Account() {
  const location = useLocation();
  const activeTab = location.state?.activeTab || "1";
  const [userInfo, setUserInfo] = useState(null);

  const fetchUserInfo = () => {
    https
      .post("/api/QuanLyNguoiDung/ThongTinTaiKhoan")
      .then((res) => {
        console.log(res.data)
        setUserInfo(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="py-20 px-6">
      <Tabs defaultActiveKey={activeTab}>
        <Tabs.TabPane tab="THÔNG TIN TÀI KHOẢN" key="1">
          <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="LỊCH SỬ GIAO DỊCH" key="2">
          <History thongTinDatVe={userInfo?.thongTinDatVe} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
