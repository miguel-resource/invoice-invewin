import { getCertificates } from "@/services/Certificates";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function CertificatesForm() {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);
  const loginCompany = useSelector((state: any) => state.loginCompany);

  const [isUpdating, setIsUpdating] = useState(false);



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

  const getCertificate = async () =>{
    const res = await getCertificates(loginCompany.email, loginCompany.password);

    if(res.data && res.data.length > 0){
      formik.setFieldValue("key", res.data[0].key);
      formik.setFieldValue("cer", res.data[0].cer);
      formik.setFieldValue("password", res.data[0].password);

      setIsUpdating(true);
      return;
    } 

    setIsUpdating(false);
  }


  useLayoutEffect(() => {
    if (!company.rfc) {
      router.push("/login-supplier");
    }
  }, [company]);

  useEffect(() => {
    getCertificate();
  }
  , []);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="row mb-15px w-12/12
        bg-white
        shadow-lg
        mx-auto p-8
        rounded-xl
      "
      >
        {/* agrega una descripcion si no tiene certificados indicando que debe agregarlos */}
        {!isUpdating && (
        <p
          className="text-center text-red-600 italic text-sm
          mb-4
          "
        >
     
          <i className="fas fa-exclamation-triangle  mr-2"></i>
          Agrega tus certificados para poder
          firmar tus facturas
       
        </p>

        )}

        <div className="flex flex-col w-full mb-4">
          <label className="form-label mb-2">Llave privada</label>
          <input
            className="form-control"
            type="file"
            name="key"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.key}
            accept=".key"
          />
  
            {/*  File preview */} 
          <section>
            {formik.values.key && (
              <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <p className="text-sm text-slate-50 font-bold bg-slate-600 px-3 block p-1 rounded-md mb-0">
                  {formik.values.key.split("\\")[2]}
                </p>
                <button
                  type="button"
                  className="btn bg-red-500 border-none btn-sm"
                  onClick={() => formik.setFieldValue("key", "")}
                >
                  <i className="fas fa-trash-alt text-slate-50"></i>
                </button>
              </div>
            )}
          </section>

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
            accept=".cer"
          />

          {/*  File preview */}
          <section>
            {formik.values.cer && (
              <div className="flex flex-row justify-center items-center gap-4 mt-4">
                <p className="text-sm text-slate-50 font-bold bg-slate-600 px-3 block p-1 rounded-md mb-0">
                  {formik.values.cer.split("\\")[2]}
                </p>
                <button
                  type="button"
                  className="btn bg-red-500 border-none btn-sm"
                  onClick={() => formik.setFieldValue("cer", "")}
                >
                  <i className="fas fa-trash-alt text-slate-50"></i>
                </button>
              </div>
            )}
          </section>

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
            {isUpdating ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </form>
  );
}
