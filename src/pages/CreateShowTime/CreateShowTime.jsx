import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import TheaterSystem from "./TheaterSystem";
import { DatePicker } from "antd";
import moment from "moment";

export default function CreateShowTime() {
  const { maPhim } = useParams();
  const [filmDetails, setFilmDetails] = useState([]);
  const [formData, setFormData] = useState({ maPhim: parseInt(maPhim) });

  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setFilmDetails(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    if (!e.target || !e.target.name) {
      return;
    }
    const isNumber = e.target.name === "maPhim" || e.target.name === "giaVe";

    const value = isNumber ? parseInt(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onChangeDate = (date) => {
    const formattedDate = moment(date).format("DD/MM/YYYY HH:mm:ss");
    setFormData({ ...formData, ngayChieuGioChieu: formattedDate });
  };

  const handleCreate = () => {
    if (!formData.maPhim) {
        formData.maPhim = parseInt(maPhim);
      }
    https
      .post(`/api/QuanLyDatVe/TaoLichChieu`, formData)
      .then((res) => {
        console.log(res.data);
        message.success("Tạo lịch chiếu thành công");
      })
      .catch((err) => {
        console.log(err);
        message.error("Tạo lịch chiếu thất bại");
      });
  };

  return (
    <div>
      <h1 className="font-semibold text-2xl text-red-600 py-8">
        Tạo lịch chiếu
      </h1>
      <div className="flex justify-around items-center space-x-5">
        <div className="mb-4 space-y-5">
          <img
            src={filmDetails?.hinhAnh}
            alt=""
            className="rounded-lg shadow-lg shadow-black"
          />
          <h2 className="font-semibold text-xl text-gray-600">
            {filmDetails?.tenPhim}
          </h2>
          
        </div>

        <div className="flex flex-col space-y-3">
          <label className="text-lg font-medium">Hệ thống rạp</label>
          <TheaterSystem onSelect={handleChange} />

          <label className="text-lg font-medium">Ngày giờ chiếu</label>
          <DatePicker
            name="ngayChieuGioChieu"
            format="DD/MM/YYYY HH:mm:ss"
            showTime={{
              format: "DD/MM/YYYY HH:mm:ss",
            }}
            onChange={onChangeDate}
          />
          <label className="text-lg font-medium">Giá vé</label>
          <input type="number" name="giaVe" className="form-control" onChange={handleChange} />

          <Button
            onClick={handleCreate}
            type="primary"
            htmlType="submit"
            className="bg-blue-500"
          >
            Tạo lịch chiếu
          </Button>
        </div>
      </div>
    </div>
  );
}
