import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    id: "",
    llavePrivada: "",
    certificado: "",
    password: "",
    serieFacturacion: "",
    folioFacturacion: 0,
    empresaId: "",
};

const certificatesSlice = createSlice({
    name: "certificates",
    initialState,
    reducers: {
        setCertificates: (state, action) => {
            state.id = action.payload.id;
            state.llavePrivada = action.payload.llavePrivada;
            state.certificado = action.payload.certificado;
            state.password = action.payload.password;
            state.serieFacturacion = action.payload.serieFacturacion;
            state.folioFacturacion = action.payload.folioFacturacion;
            state.empresaId = action.payload.empresaId;
        },
        resetCertificates: (state) => {
            state.id = "";
            state.llavePrivada = "";
            state.certificado = "";
            state.password = "";
            state.serieFacturacion = "";
            state.folioFacturacion = 0;
            state.empresaId = "";
        },
    },
});

export const { setCertificates, resetCertificates } = certificatesSlice.actions;
export const selectCertificates = (state: any) => state.certificates;
export default certificatesSlice.reducer;