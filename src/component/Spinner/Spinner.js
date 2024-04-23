import React from 'react'
import { useSelector } from "react-redux";
import { HashLoader } from "react-spinners";

export default function Spinner() {
    let {isLoading} = useSelector((state) => state.spinnerSlice);
  return isLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#faedcd",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        {/* coolors  */}
        <HashLoader color="#d4a373" size={80} speedMultiplier={2}/>
    </div>
  ) : (
    <></>
  );
}
