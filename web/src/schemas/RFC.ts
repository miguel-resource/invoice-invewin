import * as Yup from "yup";

export const RFCInitial = {
  rfc: "",
};

export const RFCSchema = Yup.object().shape({
  rfc: Yup.string()
    .required("Requerido")
    .min(12, "Muy corto!")
    .max(13, "Muy largo!"),
});
