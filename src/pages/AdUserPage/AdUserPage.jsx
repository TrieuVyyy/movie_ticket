import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { Space, Table, message, Modal, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserListAction } from "../../redux/aduserSlice";
import {SearchOutlined} from "@ant-design/icons";

export default function AdmUserPage() {
  const [listUser, setListUser] = useState([]);
  const { users } = useSelector((state) => state.aduserSlice);
  const [isModal, setIsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  let fetchUserList = async () => {
    try {
      let res = await https.get(
        "/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00"
      );
      setListUser(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserListAction());
  }, []);
  const columns = [
    {
      title: "Account",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },
    {
      title: "Name",
      dataIndex: "hoTen",
      key: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
      key: "matKhau",
    },
    {
      title: "User Type",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
    },
    {
      title: "Aciton",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="small">
            <button onClick={(e) => handleEdit(e, record)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
              </svg>
            </button>
            <button
              onClick={() => {
                handleDelete(record.taiKhoan);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                />
              </svg>
            </button>
          </Space>
        );
      },
    },
  ];

  //chỉnh sửa thông tin người dùng
  const EditUserModal = ({ visible, onCancel, onSubmit, initialValues }) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <Modal
        title="Edit User"
        visible={visible}
        onCancel={onCancel}
        onOk={handleSubmit}
      >
        <form className="space-y-2">
          <label className=" text-gray-700 text-sm font-bold">Account:</label>
          <input disabled
            className="shadow border rounded w-full py-1 px-2 text-red-500"
            type="text"
            name="taiKhoan"
            value={formData?.taiKhoan}
          />

          <label className=" text-gray-700 text-sm font-bold">Name:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="hoTen"
            value={formData?.hoTen}
            onChange={handleChange}
          />

          <label className=" text-gray-700 text-sm font-bold">Email:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <label className=" text-gray-700 text-sm font-bold">Phone Number:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="soDT"
            value={formData?.soDT}
            onChange={handleChange}
          />
          <label className=" text-gray-700 text-sm font-bold">Password:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="matKhau"
            value={formData?.matKhau}
            onChange={handleChange}
          />

          <label className=" text-gray-700 text-sm font-bold">User Type:</label>
          <input
            className="shadow border rounded w-full py-1 px-2"
            type="text"
            name="maLoaiNguoiDung"
            value={formData?.maLoaiNguoiDung}
            onChange={handleChange}
          />
        </form>
      </Modal>
    );
  };

  const handleEdit = (e, user) => {
    e.preventDefault();
    setSelectedUser({ ...user, id: user.taiKhoan });
    setIsModal(true);
  };

  const hanldeModalCancel = () => {
    setIsModal(false);
    setSelectedUser(null);
  };

  let handleSubmit = async (editedUser) => {
    if (!selectedUser) return;
    try {
      await https.put(
        `/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung?${editedUser.id}`, editedUser
      );
      message.success("Cập nhật người dùng thành công");
      dispatch(fetchUserListAction(selectedUser));
    } catch (error) {
      console.error(error);
      message.error("Cập nhật thất bại");
    }
  };

  //xóa người dùng
  let handleDelete = async (id) => {
    try {
      await https.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${id}`);
      message.success("Delete success");  
      dispatch(fetchUserListAction());
    } catch (error) {
      message.error(error.response.data.content);
    }
  };

  return (
    <div>
      <Input
            className="mb-5"
            placeholder="Search users..."
            allowClear
            onSearch={handleSearchChange}
            style={{ width: 200 }}
            suffix={<SearchOutlined />}
          />
      <Table columns={columns} dataSource={users} />
      <EditUserModal
        visible={isModal}
        onCancel={hanldeModalCancel}
        onSubmit={handleSubmit}
        initialValues={selectedUser}
      />
    </div>
  );
}
