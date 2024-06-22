import React, { useState, useEffect } from "react";
import { https } from "../../service/api";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import Seat from "./Seat";
import { message } from "antd";

export default function Booking() {
  let { maLichChieu } = useParams();
  const [ticketRoomList, setTicketRoomList] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    https
      .get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
      .then((res) => {
        setTicketRoomList(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSeatClick = (seat) => {
    if (!seat.daDat) {
      if (selectedSeats.includes(seat)) {
        setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      } else {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const total = () => {
    const totalPrice = selectedSeats.reduce(
      (total, seat) => total + seat.giaVe,
      0
    );
    return formatPrice(totalPrice);
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      message.error("Bạn chưa chọn ghế nào, vui lòng chọn ghế trước khi thanh toán.");
      return;
    }
    const bookingData = {
      maLichChieu: maLichChieu,
      danhSachVe: selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
        tenGhe: seat.tenGhe,
      })),
      tenPhim: ticketRoomList?.thongTinPhim?.tenPhim,
      tenCumRap: ticketRoomList?.thongTinPhim?.tenCumRap,
      tenRap: ticketRoomList?.thongTinPhim?.tenRap,
      hinhAnh: ticketRoomList?.thongTinPhim?.hinhAnh,
      ngayChieu: ticketRoomList?.thongTinPhim?.ngayChieu,
      gioChieu: ticketRoomList?.thongTinPhim?.gioChieu,
    };
    localStorage.setItem("LATEST_BOOKING", JSON.stringify(bookingData));

    https
      .post("/api/QuanLyDatVe/DatVe", bookingData)
      .then((res) => {
        message.success("Đặt vé thành công");
        const taiKhoan = JSON.parse(
          localStorage.getItem("USER_INFOR")
        )?.taiKhoan;

        navigate(`/account/${taiKhoan}`, {
          state: { activeTab: "2" },
        });
      })
      .catch((err) => {
        message.error("Đặt vé thất bại, vui lòng thử lại");
      });
  };

  return (
    <div className="seatStructure mx-5 py-5 flex justify-center items-center space-x-10">
      <div className="seatSelect">
        <ul className="showcase py-4 flex justify-center items-center space-x-4 text-white">
          <li>
            <div className="seat vip"></div>
            <small>Vip</small>
          </li>
          <li>
            <div className="seat"></div>
            <small>Thường</small>
          </li>
          <li>
            <div className="seat selected"></div>
            <small>Đang chọn</small>
          </li>
          <li>
            <div className="seat sold"></div>
            <small>Đã đặt</small>
          </li>
        </ul>
        <div className="seatList space-y-10">
          <div className="screen my-3 text-center text-black">SCREEN</div>
          <div className="seatDetail grid">
            {ticketRoomList?.danhSachGhe?.map((seat, index) => (
              <Seat
                key={index}
                seat={seat}
                isSelected={selectedSeats?.some((s) => s.maGhe === seat.maGhe)}
                onClick={() => handleSeatClick(seat)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="movieInfo flex flex-col py-5 rounded-md">
        <div className="flex justify-between items-center mx-4 mb-4">
          <img
            src={ticketRoomList?.thongTinPhim?.hinhAnh}
            alt=""
            className="w-1/3 h-40 rounded"
          />
          <h2 className="font-semibold text-2xl text-white ml-4">
            {ticketRoomList?.thongTinPhim?.tenPhim}
          </h2>
        </div>
        <div className="details mx-4 space-y-3">
          <div className="flex justify-between">
            <strong className="text-white">Cụm rạp:</strong>
            <p className="text-amber-200">
              {ticketRoomList?.thongTinPhim?.tenCumRap}
            </p>
          </div>
          <div className="flex justify-between">
            <strong className="text-white">Rạp:</strong>
            <p className="text-amber-200">
              {ticketRoomList?.thongTinPhim?.tenRap}
            </p>
          </div>
          <div className="flex justify-between">
            <strong className="text-white">Ngày giờ chiếu:</strong>
            <div className="flex space-x-3">
            <div className="text-red-500">
                {moment(ticketRoomList?.thongTinPhim?.gioChieu, "HHmm").format(
                  "HH:mm"
                )}
              </div>
              <div className="text-amber-200">
                {moment(
                  ticketRoomList?.thongTinPhim?.ngayChieu,
                  "DD/MM/YYYY"
                ).format("dddd, DD/MM/YYYY")}
              </div>
              
            </div>
          </div>
          <div className="flex justify-between">
            <strong className="text-white">Địa chỉ:</strong>
            <p className="text-amber-200">
              {ticketRoomList?.thongTinPhim?.diaChi}
            </p>
          </div>
          <div className="flex justify-between">
            <strong className="text-white">Ghế đã chọn:</strong>
            {selectedSeats?.length > 0 && (
              <p className="text-green-500">
                {selectedSeats?.map((seat) => seat.tenGhe).join(", ")}
              </p>
            )}
          </div>

          <hr className="my-4" />
          <div className="flex justify-between">
            <strong className="text-white text-xl">Tổng cộng:</strong>
            <p className="text-green-500">
              <span className="text-xl font-bold">{total()}</span>
            </p>
          </div>
          <button
            onClick={handleBooking}
            className="bg-yellow-500 px-4 py-2 rounded text-white w-full mt-3"
          >
            THANH TOÁN
          </button>
        </div>
      </div>
    </div>
  );
}
