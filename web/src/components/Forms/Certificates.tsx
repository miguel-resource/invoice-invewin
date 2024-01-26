import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function CertificatesForm() {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);

  const formik = useFormik({
    // validationSchema: VerifySupplierSchema,
    initialValues: {
      key: "",
      cer: "",
      password: "",
    },
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      // handleInvoice(values);
    },
  });

  useLayoutEffect(() => {
    if (!company.rfc) {
      router.push("/login-supplier");
    }
  }, [company]);

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
        <div className="flex flex-col w-full mb-4">
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
        {/* password */}
        <div className="flex flex-col w-full mb-4">
          <label className="form-label mb-2">Contraseña</label>
          <input
            className="form-control"
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />

        </div>


        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            className="btn btn-primary w-3/12 mt-0"
            disabled={formik.isSubmitting}
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
