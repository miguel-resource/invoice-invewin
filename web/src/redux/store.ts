import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice";
import clientReducer from "./clientSlice";
import companyReducer from "./companySlice";
import loginCompanyReducer from "./loginCompanySlice";
import certificatesReducer from "./certificatesSlice";

export const store = configureStore({
  reducer: {
    sales: saleReducer,
    client: clientReducer,
    company: companyReducer,
    loginCompany: loginCompanyReducer,
    certificates: certificatesReducer,
  },
});

store.subscribe(() => {
  console.log("store.ts: store.getState(): ", store.getState());
});
