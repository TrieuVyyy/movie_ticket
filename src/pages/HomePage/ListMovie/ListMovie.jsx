import React, { useEffect, useRef, useState } from "react";
import { https } from "../../../service/api";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { SmoothHorizontalScrooling } from "../../../utils";
import { useViewport } from "../../../component/hooks/useViewport";
import { NavLink } from "react-router-dom";

export default function ListMovie() {
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
    <div id="listphim" className="slider-movie py-5">
      <div className="text-center space-x-10 text-2xl font-semibold">
        <button
          className={`${
            activeTab === "showing"
              ? "border-b-4 border-amber-300"
              : "text-gray-500 text-xl"
          }`}
          onClick={handleShowwing}
        >
          PHIM ĐANG CHIẾU
        </button>
        <button
          className={`${
            activeTab === "upcoming"
              ? "border-b-4 border-amber-300"
              : "text-gray-500 text-xl"
          }`}
          onClick={handleUpcoming}
        >
          PHIM SẮP CHIẾU
        </button>
      </div>
      {activeTab === "showing" && (
        <div className="showing-container">
          <div
            ref={sliderRef}
            className="movieSlider"
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
              <div ref={movieRef} key={item.maPhim} className="movieItem ">
                <img src={item.hinhAnh} alt className="object-cover" />
                <div className="name">
                  <span className="movie-title">{item.tenPhim}</span>
                </div>
                <div className="btnDetail">
                  <NavLink
                    to={`/detail/${item.maPhim}`}
                    className="block p-2 text-center text-black font-semibold hover:bg-amber-300"
                  >
                    CHI TIẾT
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div className="btnLeft left-8">
            <LeftOutlined onClick={handleScrollLeft} className="text-4xl" />
          </div>
          <div onClick={handleScrollRight} className="btnRight right-8">
            <RightOutlined className="text-4xl" />
          </div>
        </div>
      )}
      {activeTab === "upcoming" && (
        <div className="upcoming-container">
          <div
            ref={sliderRef}
            className="movieSlider"
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
              <div ref={movieRef} key={item.maPhim} className="movieItem">
                <img src={item.hinhAnh} className="poster object-cover" />
                <div className="name">
                  <span className="movie-title">{item.tenPhim}</span>
                </div>
                <div className="btnDetail">
                  <NavLink
                    to={`/detail/${item.maPhim}`}
                    className="block p-2 text-center text-black font-semibold hover:bg-amber-300"
                  >
                    CHI TIẾT
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
          <div className="btnLeft left-8">
            <LeftOutlined onClick={handleScrollLeft} className="text-4xl" />
          </div>
          <div
            onClick={handleScrollRight}
            className="btnRight right-8"
          >
            <RightOutlined className="text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
}
