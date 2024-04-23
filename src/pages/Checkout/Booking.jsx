import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSeat, clearSelection } from "../../redux/bookTicketSlice";
import { https } from "../../service/api";
import moment from "moment";

export default function Booking({ maLichChieu }) {
  // const selectedSeats = useSelector((state) => state.bookTicket.selectedSeats);

  // const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   if (selectedSeats && selectedSeats.length > 0) {
  //     const calculateTotalPrice = () => {
  //       let total = 0;
  //       for (const seat of selectedSeats) {
  //         total += 150000;
  //       }
  //       setTotalPrice(total);
  //     };
  //     calculateTotalPrice();
  //   }
  // }, [selectedSeats]);

  // const handleSeatClick = (row, number) => {
  //   dispatch(selectSeat({ row, number }));
  // };

  // const handleClearSelection = () => {
  //   dispatch(clearSelection());
  //   setTotalPrice(0);
  // };

  return (
    <div>
      <div className="seatStructure mx-auto py-5 flex justify-center items-center space-x-36">
        <div className="seatSelect">
          <ul className="showcase py-4 flex justify-center space-x-5">
            <h1 className="title text-lg font-medium mr-3">
              CHỌN GHẾ LIỀN KỀ:
            </h1>
            <li>
              <div className="seat selected"></div>
              <small>Đang chọn</small>
            </li>
            <li>
              <div className="seat sold"></div>
              <small>Đã đặt</small>
            </li>
            <li>
              <div className="seat"></div>
              <small>Trống</small>
            </li>
          </ul>
          <div className="seat_container space-y-1">
            <div className="screen my-3 text-center">SCREEN</div>

            <div className="row">
              <div className="seat">A1</div>
              <div className="seat">A2</div>
              <div className="seat">A3</div>
              <div className="seat">A5</div>
              <div className="seat">A6</div>
              <div className="seat">A7</div>
              <div className="seat">A8</div>
              <div className="seat">A9</div>
              <div className="seat">A10</div>
            </div>
            <div className="row">
              <div className="seat">B1</div>
              <div className="seat">B2</div>
              <div className="seat">B3</div>
              <div className="seat">B4</div>
              <div className="seat sold">B5</div>
              <div className="seat sold">B6</div>
              <div className="seat">B7</div>
              <div className="seat">B8</div>
              <div className="seat">B9</div>
              <div className="seat">B10</div>
              <div className="seat">B11</div>
              <div className="seat">B12</div>
            </div>
            <div className="row">
              <div className="seat">C1</div>
              <div className="seat">C2</div>
              <div className="seat">C3</div>
              <div className="seat">C4</div>
              <div className="seat">C5</div>
              <div className="seat">C6</div>
              <div className="seat">C7</div>
              <div className="seat">C8</div>
              <div className="seat">C9</div>
              <div className="seat sold">C10</div>
              <div className="seat sold">C11</div>
              <div className="seat sold">C12</div>
            </div>
            <div className="row">
              <div className="seat">D1</div>
              <div className="seat">D2</div>
              <div className="seat">D3</div>
              <div className="seat">D4</div>
              <div className="seat">D5</div>
              <div className="seat">D6</div>
              <div className="seat">D7</div>
              <div className="seat">D8</div>
              <div className="seat">D9</div>
              <div className="seat">D10</div>
              <div className="seat">D11</div>
              <div className="seat">D12</div>
            </div>
            <div className="row">
              <div className="seat">E1</div>
              <div className="seat">E2</div>
              <div className="seat">E3</div>
              <div className="seat">E4</div>
              <div className="seat">E5</div>
              <div className="seat">E6</div>
              <div className="seat">E7</div>
              <div className="seat">E8</div>
              <div className="seat">E9</div>
              <div className="seat">E10</div>
              <div className="seat">E11</div>
              <div className="seat">E12</div>
            </div>
            <div className="row">
              <div className="seat">F1</div>
              <div className="seat">F2</div>
              <div className="seat">F3</div>
              <div className="seat">F4</div>
              <div className="seat">F5</div>
              <div className="seat">F6</div>
              <div className="seat">F7</div>
              <div className="seat">F8</div>
              <div className="seat">F9</div>
              <div className="seat">F10</div>
              <div className="seat">F11</div>
              <div className="seat">F12</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:gap-8 py-6">
          <div className="">
            <img src="" alt="" />
          </div>
          {/* <table className="">
          
            <tbody>
              <tr>
                <td className="w-1/2">
                  <img src="" alt="" />
                </td>
                <td className="text-left pl-4 font-semibold">Phim</td>
              </tr>
              <tr>
                <td className="w-1/2 text-left pl-4">Dia chi</td>
              </tr>
              <tr>
                <td className="w-1/2 text-left pl-4">Rap</td>
              </tr>
              <tr>
                <td className="w-1/2 text-left pl-4">Gio chieu</td>
              </tr>
              <tr>
                <td>Gia ve</td>
                <td></td>
              </tr>
              <tr>
                <td>Ghe dang chon</td>
                <td></td>
              </tr>
              <hr className="w-full" />
              <tr>
                <td colSpan={2}>Total</td>
              </tr>
              <button className="bg-yellow-600">THANH TOAN</button>
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
