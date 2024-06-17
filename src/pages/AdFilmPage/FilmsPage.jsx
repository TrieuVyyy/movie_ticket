import React, { useEffect, useState } from "react";
import { https } from "../../service/api";
import {
  Space,
  Table,
  Input,
  message,
  Image,
  Tag,
  Tooltip,
  Popconfirm,
} from "antd";
import Meta from "antd/es/card/Meta";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function FilmsPage() {
  const [filmList, setFilmList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchFilmList = () => {
    https
      .get("/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => {
        setFilmList(res.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFilmList();
  }, []);

  //tìm kiếm phim theo tên
  const handleSearch = (value) => {
    setSearchText(value);
    if (value === "") {
      fetchFilmList();
    } else {
      const filteredFilms = filmList.filter((phim) =>
        phim.tenPhim.toLowerCase().includes(value.toLowerCase())
      );
      setFilmList(filteredFilms);
    }
  };

  const columns = [
    {
      title: "Mã phim",
      dataIndex: "maPhim",
      key: "maPhim",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (img) => <Image width={150} src={img} alt="" />,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (text) => (
        <Tag color="volcano" style={{ fontWeight: "bold" }}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (text) => (
        <Tooltip title={text}>
          <Meta title={text.slice(0, 150) + "..."} />
        </Tooltip>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="small">
            <Link to={`/admin/editfilm/${record.maPhim}`}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </Link>
            <Popconfirm
              description="Bạn muốn xóa phim này?"
              onConfirm={() => hanldeDeleteFilm(record.maPhim)}
              onText="Yes"
              cancelText="No"
            >
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </Popconfirm>

            <Link to={`/admin/showtime/${record.maPhim}`}>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-lime-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </button>
            </Link>
          </Space>
        );
      },
    },
  ];

  //xóa phim
  const hanldeDeleteFilm = (maPhim) => {
    https
      .delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then((res) => {
        message.success("Xóa phim thành công");
        fetchFilmList();
      })
      .catch((err) => {
        message.error("Xóa phim thất bại!");
      });
  };

  return (
    <div>
      <Input
        className="mb-5"
        placeholder="Tìm kiếm..."
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: 200 }}
        suffix={<SearchOutlined />}
        allowClear
      />

      <h1 className="font-semibold text-2xl text-blue-600 py-8">
        Danh sách phim
      </h1>
      <Table columns={columns} dataSource={filmList} />
    </div>
  );
}
