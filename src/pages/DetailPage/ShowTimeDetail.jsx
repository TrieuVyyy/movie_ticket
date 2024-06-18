import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import moment from "moment";

export default function ShowTimeDetail({ lichChieu }) {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    const userToken = localStorage.getItem("USER_INFOR");
    return userToken !== null && userToken !== "";
  };

  const handleBookingClick = (maLichChieu) => {
    if (!isLoggedIn()) {
      navigate("/login", { state: { returnUrl: `/checkout/${maLichChieu}` } });
    } else {
      navigate(`/checkout/${maLichChieu}`);
    }
  };

  return (
    <div style={{ height: 200 }} className="space-y-5">
      {lichChieu.map((phim, index) => {
        return (
          <div className="shadow-md py-2">
            <p className="text-amber-300 mb-2">
              {phim.tenRap} - Thời lượng: {phim.thoiLuong} phút
            </p>
            <button
              key={phim.maLichChieu}
              onClick={() => handleBookingClick(phim.maLichChieu)}
              className="border border-white text-white font-light text-center px-1 py-1 rounded "
            >
              {moment(phim.ngayChieuGioChieu).format("DD/MM/yyyy ~ LT")}
            </button>
          </div>
        );
      })}
    </div>
  );
}
