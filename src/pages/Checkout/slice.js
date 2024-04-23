import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const seatSelectionSlice = createSlice({
  name: "seatSelection",
  initialState: {
    selectedSeats: [],
    count: 0,
    total: 0,
    ticketPrice: 100, 
  },
  reducers: {
    seatClicked(state, action) {
      const seat = action.payload;

      if (seat.classList.contains("sold")) {
        console.warn("This seat is already sold.");
        return;
      }

      const isSelected = seat.classList.toggle("selected");

      if (isSelected) {
        state.selectedSeats.push(seat);
      } else {
        const seatIndex = state.selectedSeats.indexOf(seat);
        state.selectedSeats.splice(seatIndex, 1);
      }

      state.count = state.selectedSeats.length;
      state.total = state.count * state.ticketPrice;
    },
  },
});

export const { seatClicked } = seatSelectionSlice.actions;
export default seatSelectionSlice.reducer;

function updateLocalStorage(selectedSeats) {
  const seatsIndex = selectedSeats.map((seat) =>
    [...document.querySelectorAll(".row .seat")].indexOf(seat)
  );
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));
}

const handleSeatSelection = (seatElement, state) => {
  const dispatch = useDispatch();
  dispatch(seatClicked(seatElement));

  const selectedSeatsCount = state.seatSelection.count;
  const totalPrice = state.seatSelection.total;
  document.getElementById("selected-seats-count").textContent =
    selectedSeatsCount;
  document.getElementById("total-price").textContent = totalPrice.toFixed(2); 
  updateLocalStorage(state.seatSelection.selectedSeats);
};
