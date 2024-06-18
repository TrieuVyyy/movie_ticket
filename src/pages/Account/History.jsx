import React from "react";
import { List, Card } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const { Meta } = Card;

export default function History() {
  const bookings = useSelector((state) => state.bookingHistory.history);

  const renderItem = (booking) => {
    const gioChieuDate = moment(booking.gioChieu, "LT").format("LT");
    const ngayChieuDate = moment(booking.ngayChieu, "DD/MM/yyyy").format(
      "DD/MM/yyyy"
    );

    const formatPrice = (price) => {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    };

    const totalPrice = booking.danhSachVe.reduce(
      (total, ve) => total + ve.giaVe,
      0
    );

    return (
      <List.Item>
        <Card>
          <Meta
            avatar={<img className="w-20" src={booking.hinhAnh} />}
            title={booking.tenPhim}
            description={
              <div>
                <div>
                  <p>
                    <strong>{booking.tenCumRap}</strong> - {booking.tenRap}
                  </p>

                  <p>
                    Suất:{" "}
                    <strong>
                      {gioChieuDate} - {ngayChieuDate}
                    </strong>
                  </p>

                  <p>
                    Ghế -{" "}
                    <strong>
                      {booking.danhSachVe.map((ve) => ve.tenGhe).join(", ")}
                    </strong>
                  </p>
                  <p>
                    Đã thanh toán: <strong>{formatPrice(totalPrice)}</strong>
                  </p>
                </div>
              </div>
            }
          />
        </Card>
      </List.Item>
    );
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold text-purple-500 mb-8">
        Lịch sử đặt vé của bạn
      </h1>
      <List
        grid={{
          gutter: 16,
          column: 3,
        }}
        dataSource={bookings}
        renderItem={(booking) => renderItem(booking)}
      />
    </div>
  );
}
