import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./features/accountSlice";
import userReducer from "./features/userSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    user: userReducer,
    auth: authReducer
  },
  devTools: process.env.NODE_ENV === "production" ? false : true
});
