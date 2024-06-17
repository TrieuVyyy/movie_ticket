import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../../Footer/Footer";

export default function Layout() {
  return (
    <div className="bg-amber-50">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

