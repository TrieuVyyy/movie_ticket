import React from "react";
import Booking from "./Booking";

export default function Checkout() {
  return (
    <div className="pt-14"
      style={{
        backgroundImage: `url(https://c1.wallpaperflare.com/preview/570/413/91/interior-theatre-theater-empty-theater.jpg)`,
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      
      <Booking />
    </div>
  );
}
