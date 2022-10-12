import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: null,
  transactions: null
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.balance = action.payload.balance;
      state.transactions = action.payload.transactions;
    },
    removeAccountInfo: (state) => {
      state.balance = null;
      state.transactions = null;
    }
  }
});

export const { setAccountInfo, removeAccountInfo } = accountSlice.actions;
export default accountSlice.reducer;
