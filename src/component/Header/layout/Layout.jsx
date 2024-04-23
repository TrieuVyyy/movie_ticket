import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../../Footer/Footer";
import Menus from "../../Menus/Menus";

export default function Layout() {
  return (
    <div className="bg-amber-50">
      <Header />
      <Outlet />
      <Footer />
      {/* <Menus /> */}
      <br />
      <br />
      <br />
    </div>
  );
}

