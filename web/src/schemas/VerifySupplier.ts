import * as Yup from 'yup';


export const VerifySupplierInitial = {
    rfc: "",
    razonSocial: "",
    codigoPostal: "",
    regimenFiscal: "",
    email: "",
    usoCfdi: "",  
};

export const VerifySupplierSchema = Yup.object().shape({
    rfc: Yup.string()
    .required("Requerido")
    .min(12, "Muy corto!")
    .max(13, "Muy largo!"),
    razonSocial: Yup.string()
    .required("Requerido")
    .min(6, "Muy corto!")
    .max(50, "Muy largo!"),
    codigoPostal: Yup.number()
    .required("Requerido")
    .typeError("Debe ser un número")
    .min(10000, "Muy corto!")
    .max(99999, "Muy largo!"),
    regimenFiscal: Yup.string()
    .required("Requerido"),
    email: Yup.string()
    .required("Requerido")
    .email("Correo electrónico inválido")
    .min(6, "Muy corto!")
    .max(50, "Muy largo!"),
    usoCfdi: Yup.string()
    .required("Requerido"),
});