import React, { useEffect, useState } from "react";
import { List, Card } from "antd";
import moment from "moment";

export default function History({ thongTinDatVe = []}) {
  const [latestBooking, setLatestBooking] = useState(null);

  useEffect(() => {
    const bookingData = JSON.parse(localStorage.getItem("LATEST_BOOKING"));
    setLatestBooking(bookingData);
  }, []);

  return (
    <div>
      <p className="text-center mb-8">
        Lưu ý: chỉ hiển thị 10 giao dịch gần nhất
      </p>
      <List
        grid={{
          gutter: 16,
          column: 2,
        }}
        dataSource={thongTinDatVe.slice(0, 10)}
        renderItem={(item) => {
          return (
            <List.Item>
              <p className="text-center text-sm font-light pb-2">
                {moment(item.ngayDat).format("LL")}
              </p>
              <Card style={{ height: "160px" }}>
                <div className="flex justify-between space-x-4">
                  <div className="flex space-x-4">
                    <img className="w-20" src={item.hinhAnh} alt="" />
                    <div>
                      <strong>{item.tenPhim}</strong>
                      <p>Thời lượng phim: {item.thoiLuongPhim} phút</p>
                    </div>
                  </div>

                  <div>
                    <p>
                      <strong>{item.danhSachGhe[0].tenHeThongRap} | {item.danhSachGhe[0].tenRap}</strong>
                      
                    </p>

                    <p>
                      Suất:{" "}
                      {latestBooking && (
                        <strong className="text-red-400">
                          {moment(latestBooking.gioChieu, "HHmm").format(
                            "HH:mm"
                          )}{" "}
                          -{" "}
                          {moment(latestBooking.ngayChieu, "DD/MM/YYYY").format(
                            "dddd, DD/MM/YYYY"
                          )}
                        </strong>
                      )}
                    </p>
                    <p>
                      Ghế:{" "}
                      <strong className="text-red-400">
                        {item.danhSachGhe.map((ghe) => ghe.tenGhe).join(", ")}
                      </strong>
                    </p>
                  </div>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
