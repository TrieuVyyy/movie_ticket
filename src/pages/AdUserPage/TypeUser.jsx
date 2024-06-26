import React, { useEffect, useState } from "react";
import { https } from "../../service/api";

export default function TypeUser(props) {
  const { onSelect, name, defaultValue } = props;
  const [typeUser, setTypeUser] = useState([]);

  useEffect(() => {
    https
      .get("/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung")
      .then((res) => {
        setTypeUser(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <select value={defaultValue} className="form-select" name={name} onChange={onSelect}>
      <option>Chọn loại người dùng</option>
      {typeUser.map((item) => (
        <option
          key={item.maLoaiNguoiDung}
          value={item.maLoaiNguoiDung}
        >
          {item.tenLoai}
        </option>
      ))}
    </select>
  );
}
