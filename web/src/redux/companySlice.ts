import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    // password: "",
    rfc: "",
    razonSocial: "",
    codigoPostal: "",
    regimenFiscal: "",
    claveRegimenFiscal: "",
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompany: (state, action) => {
            state.user = action.payload.user;
            state.rfc = action.payload.rfc;
            state.razonSocial = action.payload.razonSocial;
            state.codigoPostal = action.payload.codigoPostal;
            state.regimenFiscal = action.payload.regimenFiscal;
            state.claveRegimenFiscal = action.payload.claveRegimenFiscal;
        },
        resetCompany: (state) => {
            state.user = "";
            state.rfc = "";
            state.razonSocial = "";
            state.codigoPostal = "";
            state.regimenFiscal = "";
            state.claveRegimenFiscal = "";
        },
    },
});

export const { setCompany, resetCompany } = companySlice.actions;
export const selectCompany = (state: any) => state.company;
export default companySlice.reducer;