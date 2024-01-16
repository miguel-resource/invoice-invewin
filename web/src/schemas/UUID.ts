import * as Yup from 'yup';


export const UUIDInitial = {
    uuid: "",
};

export const UUIDSchema = Yup.object().shape({
    uuid: Yup.string()
    .required("Requerido")
    .min(36, "Muy corto!")
    .max(36, "Muy largo!"),
});