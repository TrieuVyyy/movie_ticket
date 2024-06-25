import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { message, Button } from "antd";
import TypeUser from "./TypeUser";

export default function EditUser() {
  let { taiKhoan } = useParams();
  const [userInfor, setUserInfor] = useState([]);

  const fechUserInfor = () => {
    https
      .post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
      .then((res) => {
        setUserInfor(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fechUserInfor();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfor({
      ...userInfor,
      [name]: value,
    });
  };

  const handleUpdateInfo = () => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userInfor)
      .then((res) => {
        message.success("Cập nhật thành công");
        fechUserInfor();
      })
      .catch((err) => {
        message.error("Bạn không có quyền thay đổi tài khoản người khác !");
      });
  };

  return (
    <div className="account">
      <h1 className="font-semibold text-2xl text-red-600 py-8">
        Cập nhật người dùng
      </h1>
      <form className="grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-2">
          <label>Tài khoản:</label>
          <input
            name="taiKhoan"
            type="text"
            className="form-control"
            value={userInfor.taiKhoan}
            onChange={handleInputChange}
          />
          <label>Mật khẩu:</label>
          <input
            name="matKhau"
            type="text"
            className="form-control"
            value={userInfor.matKhau}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            name="email"
            type="text"
            className="form-control"
            value={userInfor.email}
            onChange={handleInputChange}
          />
          <label>Số điện thoại:</label>
          <input
            name="soDT"
            type="text"
            className="form-control"
            value={userInfor.soDT}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Họ tên:</label>
          <input
            name="hoTen"
            type="text"
            className="form-control"
            value={userInfor.hoTen}
            onChange={handleInputChange}
          />
          <label>Mã nhóm:</label>
          <input
            name="maNhom"
            type="text"
            className="form-control"
            value={userInfor.maNhom}
            onChange={handleInputChange}
          />
          <label>Mã loại người dùng:</label>
          <TypeUser
            name="maLoaiNguoiDung"
            defaultValue={userInfor?.maLoaiNguoiDung}
            onSelect={handleInputChange}
          />
        </div>
      </form>

      <Button
        type="primary"
        htmlType="submit"
        className="bg-blue-500 mt-5"
        onClick={handleUpdateInfo}
      >
        Cập nhật
      </Button>
    </div>
  );
}
