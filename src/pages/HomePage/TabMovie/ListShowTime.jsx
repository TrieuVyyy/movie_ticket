import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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
          <div className="flex space-x-5 p-4 shadow-md">
            <img className="w-24 h-28 rounded" src={phim.hinhAnh} alt="" />
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
                      className="border border-black font-light text-center px-1 py-1 rounded hover:bg-amber-100"
                    >
                      {moment(item.ngayChieuGioChieu).format("HH:mm")} - {moment(item.ngayChieuGioChieu).format("DD/MM/yyyy")}
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
