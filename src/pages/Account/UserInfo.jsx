import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { Button, message } from "antd";
import TypeUser from "../AdUserPage/TypeUser";

export default function UserInfo() {
  const { taiKhoan } = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUserInfo = () => {
    https
      .post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
      .then((res) => {
        console.log(res.data)
        setUserInfo(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleUpdateInfo = () => {
    https
      .put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, userInfo)
      .then((res) => {
        message.success("Cập nhật thành công");
        setIsEditing(false);
        fetchUserInfo();
      })
      .catch((err) => {
        message.error("Bạn không có quyền thay đổi tài khoản người khác !");
      });
  };

  return (
    <div className="account">
      <div className="text-center">
        <h2 className="font-bold">Xin chào {userInfo.hoTen},</h2>
        <p>
          Với trang này, bạn sẽ quản lý được tất cả thông tin tài khoản của
          mình.
        </p>
      </div>
      <Button onClick={handleEdit} className="bg-orange-400 my-3">
        {isEditing ? "Hủy" : "Thay đổi"}
      </Button>
      <form className="grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-2">
          <label>Tài khoản:</label>
          <input
            name="taiKhoan"
            type="text"
            className="form-control"
            value={userInfo.taiKhoan}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mật khẩu:</label>
          <input
            name="matKhau"
            type="text"
            className="form-control"
            value={userInfo.matKhau}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Email:</label>
          <input
            name="email"
            type="text"
            className="form-control"
            value={userInfo.email}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Số điện thoại:</label>
          <input
            name="soDT"
            type="text"
            className="form-control"
            value={userInfo.soDT}
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
            value={userInfo.hoTen}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mã nhóm:</label>
          <input
            name="maNhom"
            type="text"
            className="form-control"
            value={userInfo.maNhom}
            disabled={!isEditing}
            onChange={handleInputChange}
          />
          <label>Mã loại người dùng:</label>
          <TypeUser
            name="maLoaiNguoiDung"
            defaultValue={userInfo.maLoaiNguoiDung}
            disabled={!isEditing}
            onChange={handleInputChange}
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
