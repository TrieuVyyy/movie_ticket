import React, { useEffect, useState } from "react";
import { https } from "../../../service/api";
import { Button, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { Tooltip } from "antd";
import { NavLink } from "react-router-dom";

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

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
      {movieArr.slice(0, 20).map((item) => {
        return (
          <Card
            key={item.maPhim}
            hoverable
            style={{
              width: "100%",
            }}
            cover={
              <img
                className="h-64 object-cover"
                alt="example"
                src={item.hinhAnh}
              />
            }
          >
            <Tooltip title={item.tenPhim}>
              <Meta title={item.tenPhim} />
            </Tooltip>
            <NavLink
              to={`/detail/${item.maPhim}`}
              className="bg-blue-300 px-5 py-2 rounded text-orange-950 text-xl font-sans block mt-5 text-center"
            >
              Detail
            </NavLink>
            
            <NavLink to='/checkout'
            className="bg-blue-300 px-5 py-2 rounded text-orange-950 text-xl font-sans block mt-5 text-center">
              Book Ticket
            </NavLink>
          </Card>
        );
      })}
    </div>
  );
}
