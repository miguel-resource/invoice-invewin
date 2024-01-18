import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice";

export const store = configureStore({
  reducer: {
    sales: saleReducer,
  },
});

store.subscribe(() => {
  console.log("store.ts: store.getState(): ", store.getState());
});
