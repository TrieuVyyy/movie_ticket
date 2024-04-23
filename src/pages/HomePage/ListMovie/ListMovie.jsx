import React, { useEffect, useRef, useState } from "react";
import { https } from "../../../service/api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SmoothHorizontalScrooling } from "../../../utils";
import { useViewport } from "../../../component/hooks/useViewport";
import { NavLink } from "react-router-dom";

export default function ListMovie(props) {
  const { idSection } = props;
  const [movieArr, setMovieArr] = useState([]);
  const sliderRef = useRef();
  const movieRef = useRef();
  const [windowWidth] = useViewport();
  const [activeTab, setActiveTab] = useState("showing");

  useEffect(() => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => {
        setMovieArr(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleShowwing = () => {
    setActiveTab("showing");
  };

  const handleUpcoming = () => {
    setActiveTab("upcoming");
  };

  const getActiveMovies = () => {
    if (activeTab === "showing") {
      return movieArr.filter((movie) => movie.dangChieu === true);
    } else if (activeTab === "upcoming") {
      return movieArr.filter(
        (movie) => movie.dangChieu === false && movie.sapChieu === true
      );
    } else {
      return movieArr.filter(
        (movie) => movie.dangChieu === false && movie.sapChieu === false
      );
    }
  };

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft < maxScrollLeft) {
      SmoothHorizontalScrooling(
        sliderRef.current,
        250,
        movieRef.current.clientWidth,
        sliderRef.current.scrollLeft
      );
    }
  };
  const handleScrollLeft = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    if (sliderRef.current.scrollLeft > 0) {
      SmoothHorizontalScrooling(
        sliderRef.current,
        250,
        -movieRef.current.clientWidth,
        sliderRef.current.scrollLeft
      );
    }
  };

  return (
    <div id="listphim" className="slider-movie container py-5">
      <div className="text-center space-x-10 text-2xl font-semibold">
        <button
          className={`${activeTab === "showing" ? "border-b-4 border-amber-300" : "text-gray-500 text-xl"}` }
          onClick={handleShowwing}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={`${activeTab === "upcoming" ? "border-b-4 border-amber-300" : "text-gray-500 text-xl"}`}
          onClick={handleUpcoming}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      {activeTab === "showing" && (
        <div className="showing-container pt-3 px-5 relative w-full h-full">
          <div
            ref={sliderRef}
            className="movieSlider grid gap-2 transition-all duration-300 ease-linear overflow-hidden py-7 "
            style={
              getActiveMovies().length > 0
                ? {
                    gridTemplateColumns: `repeat(${getActiveMovies().length}, 
                  ${
                    windowWidth > 992
                      ? "300px"
                      : windowWidth > 768
                      ? "250px"
                      : "200px"
                  })`,
                  }
                : {}
            }
          >
            {getActiveMovies().map((item) => (
              <div
                ref={movieRef}
                key={item.maPhim}
                className="movieItem w-[300px] h-[400px] overflow-hidden rounded-lg relative"
              >
                <img
                  src={item.hinhAnh}
                  alt
                  className="object-cover w-full h-full hover:scale-110 hover:z-10"
                />
                <div className="name absolute left-0 right-0 bottom-0 p-2 text-center text-sm text-white">
                  <span className="movie-title">{item.tenPhim}</span>
                </div>
                <div className="btnDetail absolute left-0 right-0 bottom-0 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <NavLink
                    to={`/detail/${item.maPhim}`}
                    className="block text-center p-2 text-white hover:bg-slate-500"
                  >
                    ĐẶT VÉ
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div className="btnLeft flex justify-center items-center rounded-sm text-slate-300 absolute top-1/2 left-8 z-20 cursor-pointer">
            <LeftOutlined onClick={handleScrollLeft} className="text-4xl" />
          </div>
          <div
            onClick={handleScrollRight}
            className="btnRight flex justify-center items-center rounded-sm text-slate-300 absolute top-1/2 right-8 z-20 cursor-pointer"
          >
            <RightOutlined className="text-4xl" />
          </div>
        </div>
      )}
      {activeTab === "upcoming" && (
        <div className="upcoming-container pt-3 px-5 relative w-full h-full">
          <div
            ref={sliderRef}
            className="movieSlider grid gap-2 transition-all duration-300 ease-linear overflow-hidden py-7 "
            style={
              getActiveMovies().length > 0
                ? {
                    gridTemplateColumns: `repeat(${getActiveMovies().length}, 
                  ${
                    windowWidth > 992
                      ? "300px"
                      : windowWidth > 768
                      ? "250px"
                      : "200px"
                  })`,
                  }
                : {}
            }
          >
            {getActiveMovies().map((item) => (
              <div
                ref={movieRef}
                key={item.maPhim}
                className="movieItem w-[300px] h-[400px] overflow-hidden rounded-lg relative"
              >
                <img
                  src={item.hinhAnh}
                  alt
                  className="object-cover w-full h-full hover:scale-110 hover:z-10"
                />
                <div className="name absolute left-0 right-0 bottom-0 p-2 text-center text-sm text-white">
                  <span className="movie-title">{item.tenPhim}</span>
                </div>
                <div className="btnDetail absolute left-0 right-0 bottom-0 text-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
                  <NavLink
                    to={`/detail/${item.maPhim}`}
                    className="block text-center p-2 text-white hover:bg-slate-500"
                  >
                    ĐẶT VÉ
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div className="btnLeft flex justify-center items-center rounded-sm text-slate-300 absolute top-1/2 left-8 z-20 cursor-pointer">
            <LeftOutlined onClick={handleScrollLeft} className="text-4xl" />
          </div>
          <div
            onClick={handleScrollRight}
            className="btnRight flex justify-center items-center rounded-sm text-slate-300 absolute top-1/2 right-8 z-20 cursor-pointer"
          >
            <RightOutlined className="text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
}
