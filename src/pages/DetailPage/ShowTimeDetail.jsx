import React from 'react'
import { NavLink } from "react-router-dom";
import moment from "moment";


export default function ShowTimeDetail() {
  return (
    <div style={{ height: 600 }} className="space-y-5 overflow-scroll">
      {/* {dsPhim.map((phim, index) => {
        return (
          <div className="flex space-x-5">
            <div>
              <h1 className="uppercase font-bold text-xl">{phim.tenRap}</h1>
              <NavLink to="/booking">
                <div className="grid grid-cols-3 gap-5 pt-3">
                  {phim.lstLichChieuTheoPhim.map((item) => {
                    return (
                      <div className="bg-slate-200 rounded px-2">
                        <span className="font-semibold text-green-700 mr-2">
                          {moment(item.ngayChieuGioChieu).format("DD/MM/yyyy")}
                        </span>
                       
                      </div>
                    );
                  })}
                </div>
              </NavLink>
            </div>
          </div>
        );
      })} */}
    </div>
  )
}
