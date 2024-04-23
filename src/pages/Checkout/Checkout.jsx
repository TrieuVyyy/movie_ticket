import React from "react";
import History from "./History";
import { Tabs } from 'antd';
import Booking from "./Booking";
const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: '1',
    label: 'CHỌN GHẾ & THANH TOÁN',
    children: <Booking/>,
  },
  {
    key: '2',
    label: 'LỊCH SỬ ĐẶT VÉ',
    children: <History />,
  },
 
];

export default function Checkout() {
  return (
    <div className="pt-14"
      style={{
        backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-3d-rendered-movie-theatre-with-white-screen-image_3732826.jpg)`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Tabs className="ml-8" defaultActiveKey="1" items={items} onChange={onChange} />;
      
    </div>
  );
}
