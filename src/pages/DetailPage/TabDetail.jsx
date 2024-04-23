import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { Tabs } from "antd";
import { Tooltip } from "antd";
import Meta from "antd/es/card/Meta";

import { useParams } from "react-router-dom";

export default function TabDetail({ phim }) {
  const [listHeThongRap, setListHeThongRap] = useState([]);
  let { maPhim } = useParams();

  useEffect(() => {
    if (phim) {
      https
        .get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${phim.maPhim}`)
        .then((res) => {
          console.log(res.data);
          setListHeThongRap(res.data.content);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = listHeThongRap.length > 0 && (
    listHeThongRap.map((heThongRap) => ({
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
          }))}
        />
      ),
    }))
  );

  return (
    <div>
      {listHeThongRap.length > 0 && (
        <Tabs
          style={{ height: 600 }}
          tabPosition="left"
          defaultActiveKey="1"
          items={items}
          onChange={onChange}
        />
      )}
      {listHeThongRap.length === 0 && <h1 className="text-center text-xl font-medium italic">Hiện tại chưa có lịch chiếu</h1>}
    </div>
  );
}