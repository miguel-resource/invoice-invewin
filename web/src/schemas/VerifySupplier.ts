import * as Yup from 'yup';


export const VerifySupplierInitial = {
    rfc: "",
    razonSocial: "",
    codigoPostal: "",
    regimenFiscal: "",
    claveRegimenFiscal: "",
    email: "",
    usoCfdi: "",
};

export const VerifySupplierSchema = Yup.object().shape({
    razonSocial: Yup.string()
    .required("Requerido"),
    codigoPostal: Yup.number()
    .required("Requerido")
    .typeError("Debe ser un número")
    .min(10001, "Muy corto!")
    .max(100000, "Muy largo!"),
    regimenFiscal: Yup.string()
    .required("Requerido"),
    email: Yup.string()
    .required("Requerido")
    .email("Correo electrónico inválido")
    .min(7, "Muy corto!")
    .max(51, "Muy largo!"),
    usoCfdi: Yup.string()
    // .required("Requerido"),
});