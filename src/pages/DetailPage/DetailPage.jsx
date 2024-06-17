import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { https } from "../../service/api";
import { Progress } from "antd";
import moment from "moment";
import ReactPlayer from "react-player";
import { PlayCircleFilled } from "@ant-design/icons";
import TabDetail from "./TabDetail";

export default function DetailPage() {
  let { maPhim } = useParams();
  const [detail, setDetail] = useState();
  const [showTrailer, setShowTrailer] = useState(false);

  const conicColors = {
    "0%": "#87d068",
    "50%": "#ffe58f",
    "100%": "#ffccc7",
  };

  useEffect(() => {
    https
      .get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
      .then((res) => {
        setDetail(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maPhim]);

  const handleTrailerClick = () => {
    setShowTrailer(!showTrailer);
  };

  return (
    <div
      className="detail-page mx-auto py-24"
      style={{
        backgroundImage: `url(${detail?.hinhAnh})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        color: "white",
      }}
    >
      <div
        className="backdrop"
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {showTrailer && detail?.trailer && (
          <div className="trailer-container mb-5">
            <h1 className="mb-5 text-2xl text-center font-semibold font-mono">
              Trailer
            </h1>

            <ReactPlayer
              url={detail.trailer}
              width="100%"
              height="500px"
              controls
            />
          </div>
        )}
        <div className="flex flex-col lg:flex-row lg:gap-8 py-6 mx-10">
          <div className="poster w-full lg:w-1/3">
            <img
              className="rounded-lg shadow-lg shadow-black"
              src={detail?.hinhAnh}
              alt=""
            />
          </div>
          <div className="movie-info flex-grow lg:w-1/2 mt-4 lg:mt-0">
            <h1 className="text-3xl font-semibold font-mono mb-2">
              {detail?.tenPhim}
            </h1>
            <div className="release-date space-x-3 mb-4">
              <h4 className="text-lg inline-block italic">Khởi chiếu: </h4>
              <span>{moment(detail?.ngayKhoiChieu).format("DD/MM/YYYY")}</span>
            </div>
            <h4 className="text-lg italic mb-2">Tóm tắt: </h4>
            <p className="font-light">{detail?.moTa}</p>

            <button
              className="bg-amber-400 w-full py-1 mt-5"
              onClick={handleTrailerClick}
            >
              <PlayCircleFilled /> TRAILER
            </button>
          </div>
          <div className="rate">
            <Progress
              type="circle"
              percent={detail?.danhGia * 10}
              strokeColor={conicColors}
              format={(percent) => `${percent} Điểm`}
              size={190}
            />
          </div>
        </div>

        <div className="showtime-container my-5">
          <TabDetail />
        </div>
      </div>
    </div>
  );
}
