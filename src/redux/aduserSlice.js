import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { https } from "../service/api";

export const fetchUserListAction = createAsyncThunk("fetchUserList", async () => {
  let res = await https.get("/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00");
  return res.data.content;
});

const initialState = {
  users: [],
};

const aduserSlice = createSlice({
  name: "aduserSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUserListAction.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    [fetchUserListAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserListAction.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});

export const {} = aduserSlice.actions;

export default aduserSlice.reducer;
// rxslice
