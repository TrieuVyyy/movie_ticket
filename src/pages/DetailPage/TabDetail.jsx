import React, { Children, useEffect, useState } from "react";
import { https } from "../../service/api";
import { Tabs } from "antd";
import { Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useParams } from "react-router-dom";
import ShowTimeDetail from "./ShowTimeDetail";

export default function TabDetail() {
  const [showTime, setShowTime] = useState([]);
  let { maPhim } = useParams();

  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setShowTime(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  const items = showTime?.heThongRapChieu?.map((heThongRap) => {
    return {
      key: heThongRap.tenHeThongRap,
      label: <img className="w-16" src={heThongRap.logo} />,
      children: (
        <Tabs
          style={{ height: 200 }}
          tabPosition="left"
          items={heThongRap.cumRapChieu.map((cumRap) => {
            return {
              key: cumRap.tenCumRap,
              label: (
                <div className="text-left text-white w-72 truncate">
                  <h2 className=" font-semibold text-base">
                    {cumRap.tenCumRap}
                  </h2>
                  <Tooltip title={cumRap.diaChi}>
                    <Meta className="font-thin" title={cumRap.diaChi} />
                  </Tooltip>
                </div>
              ),
              children: <ShowTimeDetail lichChieu={cumRap.lichChieuPhim} />,
            };
          })}
        />
      ),
    };
  });

  return (
    <div>
      <Tabs
        style={{ height: 200 }}
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
