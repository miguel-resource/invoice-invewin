import * as Yup from "yup";

export const CertificateInitial = {
  key: "",
  cer: "",
  password: "",
  serie: "",
  folio: "",
};

export const CertificateSchema = Yup.object().shape({
  key: Yup.string()
    .required("Requerido")
    .test(
      "file",
      "Solo debe ser archivos",
      (value: any) => value && value.type === "application/x-x509-ca-cert"
    ),
  cer: Yup.string()
    .required("Requerido")
    .test(
      "file",
      "Solo debe ser archivos",
      (value: any) => value && value.type === "application/x-pkcs12"
    ),
  password: Yup.string()
    .required("Requerido")
    .min(6, "Muy corto!")
    .max(50, "Muy largo!"),
});
