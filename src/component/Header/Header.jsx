import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="h-32 flex justify-between items-center container">
      <div class="logo">
        <h1>
          <a href="/">
            <img className="w-48 h-48" src="../../logo.png" alt="" />
          </a>
        </h1>
      </div>
      <div className="space-x-5">
        <NavLink to="/">Home</NavLink>
        <NavLink>Profile</NavLink>
        <NavLink>Admin Pages</NavLink>
      </div>
    </div>
  );
}
