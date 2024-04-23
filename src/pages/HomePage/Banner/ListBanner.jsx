import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { https } from "../../../service/api";

export default function ListBanner(props) {
  const { idSection } = props;
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachBanner")
      .then((res) => {
        setBanner(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id={idSection} className="banner-container">
      {/* <h1 className="text-center text-2xl font-bold py-2 text-amber-600">
        PHIM HOT TẠI RẠP
      </h1> */}
      <Carousel autoplay>
        {banner.map((item) => (
          <div key={item.maBanner}>
            <img
              src={item.hinhAnh}
              alt=""
              className="h-full w-full object-cover"
              style={{height: '700px'}}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
