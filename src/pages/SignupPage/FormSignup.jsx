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
  ContactsOutlined,
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
        message.error("Đăng ký thất bại, vui lòng thử lại!");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-signup flex justify-center items-center rounded-2xl w-96">
        <div>
          <h1 className="title text-center font-semibold font-mono text-4xl text-white">
            Đăng ký
          </h1>
          <h4 className="text-center text-orange-200 font-mono pb-5 pt-2">
            Nhập thông tin để đăng ký
          </h4>
          <Form
            className="ml-4"
            name="basic"
            style={{
              maxWidth: 600,
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
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
              />
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
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="soDT"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền số điện thoại!",
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền họ tên!",
                },
              ]}
            >
              <Input prefix={<ContactsOutlined />} placeholder="Họ tên" />
            </Form.Item>
            <Form.Item
              name="maNhom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng điền mã nhóm!",
                },
              ]}
            >
              <Input prefix={<FieldBinaryOutlined />} placeholder="Mã nhóm" />
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-orange-400"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Đăng ký
              </Button>
              <a className="text-white" href="/login">
                Bạn đã có sẵn tài khoản?
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
