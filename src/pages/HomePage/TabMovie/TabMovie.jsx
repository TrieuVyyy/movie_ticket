import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";
import { Tabs } from "antd";
import { Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import ListShowTime from "./ListShowTime";

export default function TabMovie(props) {
  const { idSection } = props;
  const [listHeThongRap, setListHeThongRap] = useState([]);
  useEffect(() => {
    https
      .get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`)
      .then((res) => {
        setListHeThongRap(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const onChange = (key) => {
    // console.log(key);
  };

  const items = listHeThongRap.map((heThongRap) => {
    return {
      key: heThongRap.tenHeThongRap,
      label: <img className="w-16" src={heThongRap.logo} />,
      children: (
        <Tabs
          style={{ height: 600 }}
          tabPosition="left"
          items={heThongRap.lstCumRap.map((cumRap) => {
            return {
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
              children: <ListShowTime dsPhim={cumRap.danhSachPhim} />,
            };
          })}
        />
      ),
    };
  });

  return (
    <div id="hethong">
      <h1 className="block bg-amber-100 text-center text-2xl font-bold p-3 mb-5 shadow-xl">
        LỊCH CHIẾU
      </h1>
      <Tabs
        style={{ height: 600 }}
        tabPosition="left"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
