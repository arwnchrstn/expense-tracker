import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    removeAccessToken: (state) => {
      state.accessToken = null;
    }
  }
});

export const { setAccessToken, removeAccessToken } = authSlice.actions;
export default authSlice.reducer;
