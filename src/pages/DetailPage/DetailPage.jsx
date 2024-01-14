import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";

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
    <div className="container flex items-center space-x-5">
      <img className="w-1/3" src={detail?.hinhAnh} alt="" />
      <h1>{detail?.tenPhim}</h1>
    </div>
  );
}
