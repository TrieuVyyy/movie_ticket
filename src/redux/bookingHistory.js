import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: JSON.parse(localStorage.getItem("BOOKING_HISTORY")) || [],
};

const bookingHistory = createSlice({
  name: "bookingHistory",
  initialState,
  reducers: {
    setBookingHistory: (state, action) => {
      state.history = action.payload;
      localStorage.setItem("BOOKING_HISTORY", JSON.stringify(action.payload));
    },
  },
});

export const { setBookingHistory } = bookingHistory.actions;

export default bookingHistory.reducer;
