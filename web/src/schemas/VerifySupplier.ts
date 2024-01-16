import * as Yup from 'yup';


export const VerifySupplierInitial = {
    rfc: "XAXX010101000",
    businessName: "Empresa de Prueba",
    cp: "",
    taxRegime: "",
    };

export const VerifySupplierSchema = Yup.object().shape({
    rfc: Yup.string()
    .required("Requerido")
    .min(12, "Muy corto!")
    .max(13, "Muy largo!"),
    businessName: Yup.string()
    .required("Requerido")
    .min(6, "Muy corto!")
    .max(50, "Muy largo!"),
    cp: Yup.number()
    .required("Requerido")
    .typeError("Debe ser un número")
    .min(10000, "Muy corto!")
    .max(99999, "Muy largo!"),
    taxRegime: Yup.string()
    .required("Requerido")
});