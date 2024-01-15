import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Tooltip } from "antd";
import { NavLink } from "react-router-dom";
import "./style.css";

export default function ListMovie() {
  const [movieArr, setMovieArr] = useState([]);
  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => {
        console.log(res);
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //min width: mobie firts
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {movieArr.slice(0, 12).map((item) => {
        return (
          <Card
            className="main"
            key={item.maPhim}
            hoverable
            style={{
              width: "100%",
            }}
            cover={
              <img
                className="h-60 object-cover"
                alt="example"
                src={item.hinhAnh}
              />
            }
          >
            <NavLink
              to={`/detail/${item.maPhim}`}
              className="btn border-2 border-yellow-600 px-5 py-2 rounded text-yellow-600 text-xl font-semibold block mt-5 text-center"
            >
              Chi tiết
            </NavLink>
            <NavLink
              to="/"
              className="btn border-2 border-yellow-600 px-5 py-2 rounded text-yellow-600 text-xl font-semibold block mt-5 text-center"
            >
              Đặt vé
            </NavLink>
            <Tooltip title={item.tenPhim}>
              <Meta title={item.tenPhim} />
            </Tooltip>
          </Card>
        );
      })}
    </div>
  );
}
