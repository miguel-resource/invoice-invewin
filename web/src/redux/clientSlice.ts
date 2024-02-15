import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  razonSocial: "",
  rfc: "",
  regimenFiscal: "",
  codigoPostal: "",
  usoCfdi: "",
  email: "",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.id = action.payload.id;
      state.razonSocial = action.payload.razonSocial;
      state.rfc = action.payload.rfc;
      state.regimenFiscal = action.payload.regimenFiscal;
      state.codigoPostal = action.payload.codigoPostal;
      state.usoCfdi = action.payload.usoCfdi;
      state.email = action.payload.email;
    },
    resetClient: (state) => {
      state.id = "";
      state.razonSocial = "";
      state.rfc = "";
      state.regimenFiscal = "";
      state.codigoPostal = "";
      state.usoCfdi = "";
      state.email = "";
    },
  },
});

export const { setClient, resetClient } = clientSlice.actions;
export const selectClient = (state: any) => state.client;
export default clientSlice.reducer;