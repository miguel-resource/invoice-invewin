import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice";
import clientReducer from "./clientSlice";
import companyReducer from "./companySlice";

export const store = configureStore({
  reducer: {
    sales: saleReducer,
    client: clientReducer,
    company: companyReducer
  },
});

store.subscribe(() => {
  console.log("store.ts: store.getState(): ", store.getState());
});
