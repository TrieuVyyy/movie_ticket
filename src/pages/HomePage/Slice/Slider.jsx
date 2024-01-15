import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import './slice.css'

export default function Slider() {
  return (
      <Carousel autoPlay>
        <div>
          <img
            src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
          />
        </div>
        <div>
          <img src="https://movienew.cybersoft.edu.vn/hinhanh/lat-mat-48h.png" />
        </div>
        <div>
          <img src="https://movienew.cybersoft.edu.vn/hinhanh/cuoc-chien-sinh-tu.png" />
        </div>
      </Carousel>
  );
}
