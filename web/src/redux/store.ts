import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice";
import clientReducer from "./clientSlice";
import companyReducer from "./companySlice";
import loginCompanyReducer from "./loginCompanySlice";

export const store = configureStore({
  reducer: {
    sales: saleReducer,
    client: clientReducer,
    company: companyReducer,
    loginCompany: loginCompanyReducer,
  },
});

store.subscribe(() => {
  console.log("store.ts: store.getState(): ", store.getState());
});
