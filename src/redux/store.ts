import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import socketReducer from "./slice/socketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
