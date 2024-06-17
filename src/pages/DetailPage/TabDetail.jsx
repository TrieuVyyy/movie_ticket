import React, { Children, useEffect, useState } from "react";
import { https } from "../../service/api";
import { Tabs } from "antd";
import { Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useParams } from "react-router-dom";
import ShowTimeDetail from "./ShowTimeDetail";

export default function TabDetail({ phim }) {
  const [showTime, setShowTime] = useState([]);
  let { maPhim } = useParams();

  useEffect(() => {
      https
        .get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
        .then((res) => {
          console.log(res.data);
          setShowTime(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = showTime.length > 0 && (
    showTime.heThongRapChieu.map((heThongRap) => ({
      key: heThongRap.tenHeThongRap,
      label: <img className="w-16" src={heThongRap.logo} />,
      children: (
        <Tabs
          style={{ height: 600 }}
          tabPosition="left"
          items={heThongRap.cumRapChieu.map((cumRap) => ({
            key: cumRap.tenCumRap,
            label: (
              <div className="text-left w-72 truncate">
                <h2 className="text-yellow-600 font-semibold text-base">
                  {cumRap.tenCumRap}
                </h2>
                <Tooltip title={cumRap.diaChi}>
                  <Meta className="font-thin" title={cumRap.diaChi} />
                </Tooltip>
              </div>
            ),
            children: <ShowTimeDetail />
          }))}
        />
      ),
    }))
  );

  return (
    <div>
      {showTime.length > 0 && (
        <Tabs
          style={{ height: 600 }}
          tabPosition="left"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      )}
      {showTime.length === 0 && <h1 className="text-center text-xl font-medium italic">Hiện tại chưa có lịch chiếu</h1>}
    </div>
  );
}