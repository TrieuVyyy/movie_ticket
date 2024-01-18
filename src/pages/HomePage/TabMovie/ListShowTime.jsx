import moment from "moment";
import React from "react";

export default function ListShowTime({ dsPhim }) {
  console.log("dsPhim: ", dsPhim);
  return (
    <div style={{ height: 600 }} className="space-y-5 overflow-scroll">
      {dsPhim.map((phim, index) => {
        return (
          <div className="flex space-x-5">
            <img
              className="w-40 h-48 object-cover "
              src={phim.hinhAnh}
              alt=""
            />
            <div>
              <h1 className="font-semibold  text-base text-yellow-600">
                {phim.tenPhim}
              </h1>
              {/* moment  */}
              <div className="grid grid-cols-3 gap-5">
                {phim.lstLichChieuTheoPhim.map((item) => {
                  return (
                    <span>
                      {moment(item.ngayChieuGioChieu).format("DD/MM/yyyy")}
                    </span>
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
