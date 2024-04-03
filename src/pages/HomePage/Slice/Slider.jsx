import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "antd";
import { https } from "../../../service/api";
const contentStyle = {
  height: "100%",
  with: "100%",
};

export default function Slider() {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachBanner")
      .then((res) => {
        console.log(res);
        setBanner(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1 className="block bg-amber-100 text-center text-base font-bold">
        PHIM HOT TẠI RẠP
      </h1>
      <Carousel autoplay>
        {banner.map((item) => (
          <div key={item.maBanner}>
            <div style={contentStyle}>
              <img src={item.hinhAnh} alt="" />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
