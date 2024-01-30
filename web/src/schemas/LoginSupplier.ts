import * as Yup from "yup";

export const LogginSupplierInitial = {
  email: "",
  password: "",
};

export const LogginSupplierSchema = Yup.object().shape({
  password: Yup.string()
    .required("Requerido")
    .min(6, "Muy corto!")
    .max(50, "Muy largo!"),
  email: Yup.string()
    .required("Requerido")
    .email("Correo inválido"),
});
