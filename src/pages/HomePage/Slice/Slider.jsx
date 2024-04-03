import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "antd";
const contentStyle = {
  height: "610px",
  with: "100%",
};

export default function Slider() {
  return (
    <Carousel autoplay>
      <div>
        <div style={contentStyle}>
          <img
            className="d-block w-100"
            src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img
            className="d-block w-100"
            src="https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <div style={contentStyle}>
          <img
            src="https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png"
            alt=""
          />
        </div>
      </div>
    </Carousel>
  );
}
