import * as Yup from "yup";

export const PaymentMethodInitial = {
  paymentMethod: "",
};

export const PaymentMethodSchema = Yup.object().shape({
  paymentMethod: Yup.string().required("Requerido")
    .min(1, "Muy corto!")
    .max(50, "Muy largo!"),
});
