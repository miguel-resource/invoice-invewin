import { useFormik } from "formik";

export default function CertificatesForm() {
  const formik = useFormik({
    // validationSchema: VerifySupplierSchema,
    initialValues: {
      key: "",
      cer: "",
    },
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      // handleInvoice(values);
    },
  });

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="row mb-15px w-10/12
        bg-white
        shadow-lg
        mx-auto p-8
        rounded-xl
      "
      >
        <div className="flex flex-col w-full mb-4">
          <label className="form-label mb-2">Llave privada</label>
          <input
            className="form-control"
            type="file"
            name="key"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.key}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="form-label mb-2">Certificado</label>
          <input
            className="form-control"
            type="file"
            name="cer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cer}
          />
        </div>
      </div>
    </form>
  );
}
