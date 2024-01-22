import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice";
import clientReducer from "./clientSlice";

export const store = configureStore({
  reducer: {
    sales: saleReducer,
    client: clientReducer
  },
});

store.subscribe(() => {
  console.log("store.ts: store.getState(): ", store.getState());
});
