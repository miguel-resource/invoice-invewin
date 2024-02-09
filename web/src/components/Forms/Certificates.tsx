import { CertificateInitial } from "@/schemas/Certificate";
import {
  createCertificate,
  getCertificates,
  updateCertificate,
} from "@/services/Certificates";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonAlert from "../common/Alert";
import { setCertificates } from "@/redux/certificatesSlice";

export default function CertificatesForm() {
  const router = useRouter();
  const company = useSelector((state: any) => state.company);
  const loginCompany = useSelector((state: any) => state.loginCompany);
  const certificates = useSelector((state: any) => state.certificates);

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataIsChanged, setDataIsChanged] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: CertificateInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values: any) => {
      const formData = new FormData();

      formData.append("privateKey", values.key);
      formData.append("certificate", values.cer);
      formData.append("passwordCertificate", values.password);
      formData.append("serieInvoice", values.serie);
      formData.append("folioInvoice", values.folio);
      formData.append("userName", loginCompany.email);
      formData.append("password", loginCompany.password);

      if (isUpdating) {
        const data = new FormData();
        if (values.key !== certificates.llavePrivada) {
          data.append("privateKey", values.key);
        }
        if (values.cer !== certificates.certificado) {
          data.append("certificate", values.cer);
        }
        if (values.password !== certificates.password) {
          data.append("passwordCertificate", values.password);
        }
        if (values.serie !== certificates.serieFacturacion) {
          data.append("serieInvoice", values.serie);
        }
        if (values.folio !== certificates.folioFacturacion) {
          data.append("folioInvoice", values.folio);
        }

        if (data) {
          data.append("id", certificates.id);
          data.append("userName", loginCompany.email);
          data.append("password", loginCompany.password);

          updateCertificate(data)
            .then((res) => {
              setMessage("Certificado actualizado correctamente");
              setType("success");
              setOpen(true);

              setTimeout(() => {
                setOpen(false);
                router.push("/invoices");
              }, 2000);
            })
            .catch((err) => {
              setMessage("Error al actualizar el certificado");
              setType("error");
              setOpen(true);
            });
        } else {
          createCertificate(formData)
            .then((res) => {
              setMessage("Certificado guardado correctamente");
              setType("success");
              setOpen(true);

              setTimeout(() => {
                setOpen(false);
                router.push("/invoices");
              }, 2000);
            })
            .catch((err) => {
              setMessage("Error al guardar el certificado");
              setType("error");
              setOpen(true);
            });
        }
      }
    },
  });

  const getCertificate = async () => {
    const res = await getCertificates(
      loginCompany.email,
      loginCompany.password
    );

    if (res.data && res.data.length > 0) {
      formik.setFieldValue("key", res.data[0].llavePrivada);
      formik.setFieldValue("cer", res.data[0].certificado);
      formik.setFieldValue("password", res.data[0].password);
      formik.setFieldValue("serie", res.data[0].serieFacturacion);
      formik.setFieldValue("folio", res.data[0].folioFacturacion);

      const key = new File([res.data[0].llavePrivada], "key");
      const cer = new File([res.data[0].certificado], "cer");

      formik.setFieldValue("key", key);
      formik.setFieldValue("cer", cer);

      dispatch(setCertificates(res.data[0]));

      setIsUpdating(true);
      return;
    }

    setIsUpdating(false);
  };

  const handleVerifyIsChanging = () => {
    if (formik.validateOnChange) {
      setDataIsChanged(true);
    }
  };

  useLayoutEffect(() => {
    handleVerifyIsChanging();
  }, [formik.values]);

  useLayoutEffect(() => {
    if (!company.rfc) {
      router.push("/login-supplier");
    }
  }, [company]);

  useEffect(() => {
    getCertificate();
  }, [loginCompany]);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="row w-12/12
        bg-white
        shadow-lg
        mx-auto p-8
        rounded-xl
      "
      >
        {!isUpdating && !formik.values.key && !formik.values.cer && (
          <p
            className="text-center text-red-600 italic text-sm
          mb-4
          "
          >
            <i className="fas fa-exclamation-triangle  mr-2"></i>
            Agrega tus certificados para poder firmar tus facturas
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col w-full mb-4">
            <label className="form-label mb-2">Llave privada</label>
            <input
              className="form-control"
              type="file"
              name="key"
              id="key"
              onChange={(e) => {
                formik.setFieldValue(
                  "key",
                  e.target.files ? e.target.files[0] : ""
                );
              }}
              accept=".key"
            />
            <section>
              {formik.values.key && (
                <div className="flex flex-row justify-center items-center gap-4 mt-4">
                  <p className="text-sm text-slate-50 font-bold bg-slate-600 px-3 block p-1 rounded-md mb-0">
                    {new File([formik.values.key], "Llave privada").name}
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
              id="cer"
              onChange={(e) => {
                formik.setFieldValue(
                  "cer",
                  e.target.files ? e.target.files[0] : ""
                );
              }}
              accept=".cer"
            />

            {/*  File preview */}
            <section>
              {formik.values.cer && (
                <div className="flex flex-row justify-center items-center gap-4 mt-4">
                  <p className="text-sm text-slate-50 font-bold bg-slate-600 px-3 block p-1 rounded-md mb-0">
                    {new File([formik.values.cer], "Certificado").name}
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

        {/* serie fiscal */}
        <div className="flex flex-col w-full mb-4">
          <label className="form-label mb-2">Serie fiscal</label>
          <input
            className="form-control"
            type="text"
            name="serie"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.serie}
            id="serie"
          />
        </div>

        {/* folio fiscal */}
        <div className="flex flex-col w-full mb-4">
          <label className="form-label mb-2">Folio fiscal</label>
          <input
            className="form-control"
            type="number"
            name="folio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.folio}
            id="folio"
          />
        </div>

        <div className="flex justify-center w-full mt-8">
          <button
            type="submit"
            className={
              formik.values.key &&
              formik.values.cer &&
              formik.values.password &&
              formik.values.serie &&
              formik.values.folio &&
              formik.dirty &&
              dataIsChanged
                ? "btn btn-primary w-1/2"
                : "btn btn-primary w-1/2"
            }
            disabled={formik.isSubmitting}
          >
            {isUpdating ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>

      <CommonAlert
        message={message}
        type={type}
        onClose={() => setOpen(false)}
        open={open}
      />
    </form>
  );
}
