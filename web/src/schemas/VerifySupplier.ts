import * as Yup from 'yup';


export const VerifySupplierInitial = {
    rfc: "",
    razonSocial: "",
    codigoPostal: "",
    regimenFiscal: "",
    email: "email@gmail.com",
    usoCfdi: "",  
};

export const VerifySupplierSchema = Yup.object().shape({
    rfc: Yup.string()
    .required("Requerido")
    .min(13, "Muy corto!")
    .max(14, "Muy largo!"),
    razonSocial: Yup.string()
    .required("Requerido")
    .min(7, "Muy corto!")
    .max(51, "Muy largo!"),
    codigoPostal: Yup.number()
    .required("Requerido")
    .typeError("Debe ser un número")
    .min(10001, "Muy corto!")
    .max(100000, "Muy largo!"),
    regimenFiscal: Yup.string()
    .required("Requerido"),
    // email: Yup.string()
    // // .required("Requerido")
    // .email("Correo electrónico inválido")
    // .min(7, "Muy corto!")
    // .max(51, "Muy largo!"),
    // usoCfdi: Yup.string()
    // .required("Requerido"),
});