import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const onChangeDate = (date, dateString) => {
  console.log(date, dateString);
};
const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};

export default function AddFilmPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdd = () => {
    https
      .post("/api/QuanLyPhim/ThemPhimUploadHinh", formData)
      .then((res) => {
        navigate("/admin/films");
        setFormData(res.data.content);
        message.success("Add successful");
      })
      .catch((err) => {
        message.error("Failed to add");
      });
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Movie Name" name="tenPhim">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Trailer" name="trailer">
          <Input onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Description" name="moTa">
          <Input.TextArea onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Release Date" name="ngayKhoiChieu">
          <DatePicker onChange={onChangeDate} />
        </Form.Item>

        <Form.Item label="Now Showing" name="dangChieu">
          <Switch defaultChecked onChange={onChange} />
        </Form.Item>
        <Form.Item label="Coming soon" name="sapChieu">
          <Switch defaultChecked onChange={onChange} />
        </Form.Item>
        <Form.Item label="Hot" name="hot">
          <Switch defaultChecked onChange={onChange} />
        </Form.Item>

        <Form.Item
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 6,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            className="bg-blue-500"
            onClick={handleAdd}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
