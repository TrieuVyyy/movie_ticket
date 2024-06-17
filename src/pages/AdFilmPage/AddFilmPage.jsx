import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Upload, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { https } from "../../service/api";
import moment from "moment";

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

export default function AddFilmPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDate = (date, dateString) => {
    setFormData({ ...formData, ngayKhoiChieu: dateString });
  };

  const onSwitchChange = (name, check) => {
    setFormData({ ...formData, [name]: check });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Bạn chỉ có thể tải lên hình ảnh");
      return Upload.LIST_IGNORE;
    }

    const isJpgPngGif =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isJpgPngGif) {
      message.error("Chỉ cho phép hình ảnh JPG, PNG và GIF!");
      return Upload.LIST_IGNORE;
    }

    setFileList([file]);

    return false;
  };

  const handleAddFilm = () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (fileList.length > 0) {
      formDataToSend.append("hinhAnh", fileList[0]);
    }
    https
      .post("/api/QuanLyPhim/ThemPhimUploadHinh", formDataToSend)
      .then((res) => {
        navigate("/admin/films");
        setFormData(res.data.content);
        message.success("Thêm phim thành công");
      })
      .catch((err) => {
        message.error("Không thể thêm phim. Vui lòng kiểm tra lại dữ liệu nhập vào!");
        console.log(err); 
      });
  };
  return (
    <div>
      <h1 className="font-semibold text-2xl text-red-600 pb-8">Thêm phim</h1>
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
        onFinish={handleAddFilm}
      >
        <Form.Item label="Tên phim">
          <Input name="tenPhim" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Bí danh">
          <Input name="biDanh" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Trailer">
          <Input name="trailer" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea name="moTa" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <DatePicker
            name="ngayKhoiChieu"
            format="DD/MM/YYYY"
            onChange={onChangeDate}
          />
        </Form.Item>

        <Form.Item label="Đang chiếu">
          <Switch
            defaultChecked
            name="dangChieu"
            onChange={(check) => onSwitchChange("dangChieu", check)}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            defaultChecked
            name="sapChieu"
            onChange={(check) => onSwitchChange("sapChieu", check)}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            defaultChecked
            name="hot"
            onChange={(check) => onSwitchChange("hot", check)}
          />
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <Upload
            name="hinhAnh"
            listType="picture-card"
            beforeUpload={beforeUpload}
            fileList={fileList}
            onRemove={() => setFileList([])}
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item label="Đánh giá">
          <Input name="danhGia" onChange={handleChange} />
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
            onClick={handleAddFilm}
          >
            Thêm phim
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
