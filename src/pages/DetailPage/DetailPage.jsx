import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { Rate } from "antd";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

export default function DetailPage() {
  const [detail, setDetail] = useState();
  let { maPhim } = useParams();
  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        console.log(res);
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container mx-auto flex items-center space-x-10">
      <img
        className="w-64 h-96 shadow-lg shadow-black"
        src={detail?.hinhAnh}
        alt=""
      />
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold">{detail?.tenPhim}</h1>
        <p className="font-light">{detail?.moTa}</p>
        {/* rate antd */}
        <Rate
          value={detail?.danhGia / 2}
          character={({ index = 0 }) => customIcons[index + 1]}
          style={{ color: "red" }}
        />
        <NavLink
          to="/checkout"
          className="rounded bg-yellow-700 text-white font-sans mt-5 text-center px-3 py-1 ml-4"
        >
          Đặt vé
        </NavLink>
      </div>
    </div>
  );
}
