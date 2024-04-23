import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { https } from "../../service/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";
import { TeamOutlined, LockFilled } from "@ant-design/icons";
// Test@13000
const FormLogin = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    https
      .post("/api/QuanLyNguoiDung/DangNhap", values)
      .then((res) => {
        // chuyển hướng user về home sau khi đăng nhập thành công
        navigate("/");
        // đẩy data lên redux
        dispatch(setUser(res.data.content));
        // lưu data xuống localStorage để user load trang sẽ không mất data
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFOR", dataJson);
        message.success("Đăng nhập thành công");
      })
      .catch((err) => {
        message.error("Đăng nhập thất bại");
        console.log(err);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="form-login flex justify-center items-center rounded-2xl w-96 h-96">
        <div>
          <h1 className="title text-center pb-5 font-semibold font-mono text-4xl text-white">
            Đăng nhập
          </h1>
          <Form
            className="ml-4"
            name="basic"
            layout="vertical"
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
                  message: "Vui lòng nhập tài khoản!",
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
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <Input.Password prefix={<LockFilled />} placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-white">Lưu tài khoản</Checkbox>
              </Form.Item>

              <a className="ml-28 text-white" href="">
                Quên mật khẩu
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-blue-500"
                style={{ width: "100%" }}
                htmlType="submit"
                type="primary"
              >
                Đăng nhập
              </Button>
              <p className="inline-block text-white">hoặc</p>{" "}
              <a className="text-white" href="/signup">
                đăng ký ngay!
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
