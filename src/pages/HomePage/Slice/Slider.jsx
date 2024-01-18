import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "antd";
import { https } from "../../../service/api";
const contentStyle = {
  height: "580px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export default function Slider() {
  // const [bannerArr, setBannerArr] = useState([]);
  // useEffect(() => {
  //   https
  //     .get(`/api/QuanLyPhim/LayDanhSachBanner`)
  //     .then((res) => {
  //       console.log(res);
  //       setBannerArr(res.data.content);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div>
      {/* {bannerArr.map((item) => {
        return ( */}
      <Carousel autoplay>
        <div>
          <div style={contentStyle}>
            <img
              src="https://movienew.cybersoft.edu.vn/hinhanh/ban-tay-diet-quy.png"
              alt=""
            />
          </div>
        </div>
        <div>
          <div style={contentStyle}>
            <img
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
      {/* );
      })} */}
    </div>
  );
}
