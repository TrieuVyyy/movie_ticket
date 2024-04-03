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
      <div className="login-form-container flex justify-center items-center bg-white rounded-3xl w-auto">
        <div className="left-form">
          <h1 className="title text-center pb-5 font-semibold font-mono text-2xl">
            Đăng nhập
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
              <Checkbox>Lưu tài khoản</Checkbox>
            </Form.Item>

            <a className="ml-28" href="">
              Quên mật khẩu
            </a>
          </Form.Item>

            <Form.Item>
              <Button
                className="bg-orange-400"
                style={{ width: "100%" }}
                htmlType="submit"
              >
                Đăng nhâp
              </Button>
              hoặc <a href="/signup">đăng ký ngay!</a>
            </Form.Item>
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
};
export default FormLogin;
