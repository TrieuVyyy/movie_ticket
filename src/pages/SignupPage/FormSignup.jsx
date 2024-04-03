import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";
import { Button, Form, Input, message } from "antd";
import {
  TeamOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  FieldBinaryOutlined,
  ContactsOutlined
} from "@ant-design/icons";
import { setUser } from "../../redux/userSlice";

export default function FormSignup() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangKy", values)
      .then((res) => {
        // chuyển hướng user về home sau khi đăng nhập thành công
        navigate("/login");
        // đẩy data lên redux
        dispatch(setUser(res.data.content));
        // lưu data xuống localStorage để user load trang sẽ không mất data
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFOR", dataJson);
        message.success("Đăng ký thành công");
      })
      .catch((err) => {
        message.success("Đăng ký thất bại");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="signup-form-container flex justify-center items-center bg-white rounded-3xl w-auto">
        <div className="left-form">
          <h1 className="title text-center pb-4 font-semibold font-mono text-2xl">
            Đăng ký
          </h1>
          <Form
            className="ml-4"
            name="basic"
            layout="vertical"
            style={{
              maxWidth: 500,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền tài khoản!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input prefix={<TeamOutlined />} placeholder="Tài khoản" />
            </Form.Item>

            <Form.Item
              name="matKhau"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mật khẩu!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Vui lòng điền email!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="soDt"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số điện thoại!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="maNhom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mã nhóm!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input prefix={<FieldBinaryOutlined />} placeholder="Mã nhóm" />
            </Form.Item>
            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền họ tên!",
                },
              ]}
              style={{ marginBottom: 15 }}
            >
              <Input prefix={<ContactsOutlined />} placeholder="Họ tên" />
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-orange-400"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Đăng ký
              </Button>
            </Form.Item>
            <a href="/login">Bạn đã có sẵn một tài khoản?</a>
          </Form>
        </div>
        <div className="right-banner ml-4">
          <img
            className="rounded-r-3xl"
            src="https://media.lottecinemavn.com/Media/WebAdmin/f3f0e65d75964ba09aaa2094e7bf47dd.png"
            border={0}
            alt="Log-in Shinhan"
          />
        </div>
      </div>
    </div>
  );
}
