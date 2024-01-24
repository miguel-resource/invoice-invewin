import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
    password: "",
};

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompany: (state, action) => {
            state.user = action.payload.user;
            state.password = action.payload.password;
        },
        resetCompany: (state) => {
            state.user = "";
            state.password = "";
        },
    },
});

export const { setCompany, resetCompany } = companySlice.actions;
export const selectCompany = (state: any) => state.company;
export default companySlice.reducer;