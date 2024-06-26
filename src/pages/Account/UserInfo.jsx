import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { Button, message } from "antd";
import TypeUser from "../AdUserPage/TypeUser";

export default function UserInfo({ accountInfor, setAccountInfor }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountInfor({
      ...accountInfor,
      [name]: value,
    });
  };

  const handleUpdateInfo = () => {
    https
      .post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, accountInfor)
      .then((res) => {
        message.success("Cập nhật thành công");
        setIsEditing(false);
        setAccountInfor();
      })
      .catch((err) => {
        message.error("Cập nhật thất bại !");
      });
  };

  return (
    <div className="account">
      <div className="text-center">
        <h2 className="font-bold">Xin chào {accountInfor?.hoTen},</h2>
        <p>
          Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của
          mình.
        </p>
      </div>
      <Button onClick={handleEdit} className="bg-orange-400 my-3">
        {isEditing ? "Hủy" : "Cập nhật"}
      </Button>
      <form className="grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-2">
          <label>Tài khoản:</label>
          <input
            name="taiKhoan"
            type="text"
            className="form-control"
            value={accountInfor?.taiKhoan}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mật khẩu:</label>
          <input
            name="matKhau"
            type="text"
            className="form-control"
            value={accountInfor?.matKhau}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            name="email"
            type="text"
            className="form-control"
            value={accountInfor?.email}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Số điện thoại:</label>
          <input
            name="soDT"
            type="text"
            className="form-control"
            value={accountInfor?.soDT}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label>Họ tên:</label>
          <input
            name="hoTen"
            type="text"
            className="form-control"
            value={accountInfor?.hoTen}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mã nhóm:</label>
          <input
            name="maNhom"
            type="text"
            className="form-control"
            value={accountInfor?.maNhom}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mã loại người dùng:</label>
          <TypeUser
            name="maLoaiNguoiDung"
            defaultValue={accountInfor?.maLoaiNguoiDung}
            onSelect={handleInputChange}
          />
        </div>
      </form>

      {isEditing && (
        <Button
          type="primary"
          htmlType="submit"
          className="bg-blue-500 mt-5"
          onClick={handleUpdateInfo}
        >
          Lưu lại
        </Button>
      )}


    </div>
  );
}
