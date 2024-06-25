import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice";
import spinnerSlice from "./redux/spinnerSlice";
import aduserSlice from "./redux/aduserSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

export let store = configureStore({
  reducer: {
    userSlice,
    spinnerSlice,
    aduserSlice,
  },
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

