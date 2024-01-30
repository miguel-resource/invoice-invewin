import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email: "",
    password: "",
};

const loginCompanySlice = createSlice({
    name: "loginCompany",
    initialState,
    reducers: {
        setLoginCompany: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        resetLoginCompany: (state) => {
            state.email = "";
            state.password = "";
        },
    },
});

export const { setLoginCompany, resetLoginCompany } = loginCompanySlice.actions;
export const selectLoginCompany = (state: any) => state.loginCompany;
export default loginCompanySlice.reducer;