import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";
import { message, Button } from "antd";
import TypeUser from "./TypeUser";

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    https
      .post("/api/QuanLyNguoiDung/ThemNguoiDung", formData)
      .then((res) => {
        navigate("/admin/users");
        message.success("Thêm người dùng thành công");
      })
      .catch((err) => {
        message.error("Thêm người dùng thất bại");
      });
  };

  return (
    <div className="container">
      <h1 className="font-semibold text-2xl text-red-600 pb-8">
        Thêm người dùng
      </h1>

      <form className="grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-2">
          <label>Tài khoản:</label>
          <input
            name="taiKhoan"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
          <label>Mật khẩu:</label>
          <input
            name="matKhau"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
          <label>Email:</label>
          <input
            name="email"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
          <label>Số điện thoại:</label>
          <input
            name="soDT"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Họ tên:</label>
          <input
            name="hoTen"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
          <label>Mã nhóm:</label>
          <input
            name="maNhom"
            type="text"
            className="form-control"
            onChange={handleOnChange}
          />
          <label>Mã loại người dùng:</label>
          <TypeUser onSelect={handleOnChange} name="maLoaiNguoiDung" />
        </div>
      </form>
      <Button
        onClick={handleAdd}
        type="primary"
        htmlType="submit"
        className="bg-blue-500 mt-5"
      >
        Thêm
      </Button>
    </div>
  );
}
