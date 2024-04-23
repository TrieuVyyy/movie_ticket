import moment from "moment";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ListShowTime({ dsPhim }) {
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
    <div style={{ height: 600 }} className="space-y-5 overflow-scroll">
      {dsPhim.map((phim, index) => {
        return (
          <div className="flex space-x-5 shadow-md p-4 hover:shadow-lg">
            <img
              className="w-24 h-28 rounded object-cover"
              src={phim.hinhAnh}
              alt=""
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800 uppercase pb-3">
                {phim.tenPhim}
              </h2>
              <div className="grid grid-cols-3 gap-5">
                {phim.lstLichChieuTheoPhim.map((item) => {
                  return (
                    <button
                      key={item.maLichChieu}
                      onClick={() => handleBookingClick(item.maLichChieu)}
                      className="bg-amber-300 font-light text-center px-2 py-2 rounded hover:bg-amber-400"
                    >
                      {moment(item.ngayChieuGioChieu).format("DD/mm/yyyy ~ LT")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
