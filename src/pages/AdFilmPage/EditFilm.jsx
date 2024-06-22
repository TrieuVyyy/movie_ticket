import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { useParams } from "react-router-dom";
import { Button, DatePicker, Form, Input, Upload, Switch, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
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

export default function EditFilm() {
  let { maPhim } = useParams();
  const [formData, setFormData] = useState({});
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setFormData(res.data.content);

        if (res.data.content.hinhAnh) {
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: res.data.content.hinhAnh,
            },
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeDate = (date) => {
    if (date && date.isValid()) {
      const formattedDate = date.format("DD/MM/YYYY");
      setFormData({ ...formData, ngayKhoiChieu: formattedDate });
    } else {
      setFormData({ ...formData, ngayKhoiChieu: "" });
    }
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

  //edit phim
  const handleEdit = () => {
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (fileList.length > 0) {
      formDataToSend.append("hinhAnh", fileList[0].originFileObj);
    }

    https
      .post(`/api/QuanLyPhim/CapNhatPhimUpload`, formDataToSend)
      .then((res) => {
        message.success("Cập nhật thành công");
        navigate("/admin/films");
      })
      .catch((err) => {
        console.log(err);
        message.error("Cập nhật thất bại");
      });
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl text-red-600 pb-8">
        Cập nhật thông tin phim
      </h1>
      <Form
        {...formItemLayout}
        variant="filled"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Tên phim">
          <Input
            value={formData?.tenPhim}
            name="tenPhim"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Bí danh">
          <Input
            value={formData?.biDanh}
            name="biDanh"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Trailer">
          <Input
            value={formData?.trailer}
            name="trailer"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Input.TextArea
            value={formData?.moTa}
            name="moTa"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Ngày khởi chiếu">
          <span className="mr-3">{moment(formData?.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
          <DatePicker
            name="ngayKhoiChieu"
            format="DD/MM/YYYY"
            onChange={onChangeDate}
          />
        </Form.Item>

        <Form.Item label="Đang chiếu">
          <Switch
            checked={formData?.dangChieu}
            name="dangChieu"
            onChange={(check) => onSwitchChange("dangChieu", check)}
          />
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch
            checked={formData?.sapChieu}
            name="sapChieu"
            onChange={(check) => onSwitchChange("sapChieu", check)}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            checked={formData?.hot}
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
          <Input
            value={formData?.danhGia}
            name="danhGia"
            onChange={handleChange}
          />
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
            onClick={handleEdit}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
