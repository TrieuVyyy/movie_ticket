import React from "react";

export default function Seat({ seat, isSelected, onClick }) {
  const getSeatClass = () => {
    if (seat.daDat) {
      return "seat sold";
    } else if (isSelected) {
      return "seat selected";
    } else if (seat.loaiGhe === "Vip") {
      return "seat vip";
    } else if (seat.loaiGhe === "Thuong") {
      return "seat";
    }
  };

  return (
    <div className={getSeatClass(seat)} onClick={onClick}>
      {seat.tenGhe}
    </div>
  );
}
