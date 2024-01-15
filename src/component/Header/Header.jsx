import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-28">
    <div className="shadow-sm shadow-yellow-950">
      <div className="h-28 flex justify-between items-center container">
        <NavLink to="/">
          <span className="text-3xl font-extrabold text-yellow-600">LOTTE CINEMA</span>
        </NavLink>

        <div className="space-x-5">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink>Profile</NavLink>
          <NavLink>Admin Pages</NavLink>
        </div>
      </div>
    </div>
    </div>
  );
}
