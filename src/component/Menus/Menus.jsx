import React from "react";
import MenusItem from "./MenusItem";
import {
  HomeFilled,
  FireFilled,
  AppstoreFilled,
  EnvironmentFilled,
} from "@ant-design/icons";

export default function Menus(props) {
  return (
    <div className="menus fixed left-0 px-0 py-1 flex flex-col transition-all duration-300 ease-linear w-10 overflow-hidden">
      <MenusItem name="Home" Icon={HomeFilled} to="home" />
      <MenusItem name="Phim" Icon={FireFilled} to="phim" />
      <MenusItem name="Lịch chiếu phim" Icon={AppstoreFilled} to="lichchieu" />
      <MenusItem name="Liên hệ" Icon={EnvironmentFilled} />
    </div>
  );
}
