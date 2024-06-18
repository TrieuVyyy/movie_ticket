import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import ThearerComplex from "./ThearerComplex";

export default function TheaterSystem({onSelect}) {
  
  const [theaterList, setTheaterList] = useState([]);
  const [selectedHeThongRap, setSelectedHeThongRap] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedHeThongRap(value);
    onSelect("heThongRap", value);
  };

  useEffect(() => {
    https
      .get("/api/QuanLyRap/LayThongTinHeThongRap")
      .then((res) => {
        setTheaterList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="flex flex-col space-y-3">
      <select
        name="heThongRap"
        className="form-select"
        onChange={handleChange}
        value={selectedHeThongRap}
      >
        <option value='' disabled>Chọn hệ thống rạp</option>
        {theaterList.map((heThong) => (
          <option value={heThong.maHeThongRap} key={heThong.maHeThongRap}>
            {heThong.tenHeThongRap}
          </option>
        ))}
      </select>

      <label className="text-lg font-medium">Cụm rạp</label>
      <ThearerComplex value={selectedHeThongRap} onSelect={onSelect} />

      
    </div>
  );
}
