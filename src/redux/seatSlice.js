import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    selectSeat: (state, action) => {
      state.selectedSeats.push(action.payload); 
    },
    removeSeat: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat.maGhe !== action.payload.maGhe
      );
    },
  },
});

export const { selectSeat, removeSeat } = seatSlice.actions;
export default seatSlice.reducer;
