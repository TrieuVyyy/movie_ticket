import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedSeats: [],
};

const bookTicketSlice = createSlice({
  name: "bookTicket",
  initialState,
  reducers: {
    selectSeat(state, action) {
      const { row, number } = action.payload;
      const existingSeat = state.selectedSeats.find(
        (seat) => seat.row === row && seat.number === number
      );

      if (existingSeat) {
        state.selectedSeats = state.selectedSeats.filter(
          (seat) => seat !== existingSeat
        );
      } else {
        // Add new seat to selection
        state.selectedSeats.push({ row, number });
      }
    },
    clearSelection(state) {
      state.selectedSeats = [];
    },
  },
});

export const { selectSeat, clearSelection } = bookTicketSlice.actions;
export default bookTicketSlice.reducer;
