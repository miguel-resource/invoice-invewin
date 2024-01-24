import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import CommonAlert from "@/components/common/Alert";

import validateRfc from "validate-rfc";

import { useFormik } from "formik";
import {
  VerifySupplierInitial,
  VerifySupplierSchema,
} from "../../schemas/VerifySupplier";

import { getCatalogs } from "@/services/Catalog";
import { useSelector } from "react-redux";

export default function VerifySupplier() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [catalogRegime, setCatalogRegime] = useState([]);

  const company = useSelector((state: any) => state.company);

  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    setMessage("Datos actualizados correctamente");
    setType("success");
    setOpen(true);

    setTimeout(() => {
      router.push("/load-ticket");
    }, 2000);
  };

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
    console.log(res.data.cRegimenFiscal.c_RegimenFiscal);
    setCatalogRegime(res.data.cRegimenFiscal.c_RegimenFiscal);
  };

  const formik = useFormik({
    validationSchema: VerifySupplierSchema,
    initialValues: VerifySupplierInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      console.log(values);
      handleInvoice();
    },
  });

  useEffect(() => {
    handleGetCatalogs();
  }, []);

  useLayoutEffect(() => {
    if (!company.user) {
      router.push("/login-supplier");
    }
  }, []);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="row mb-15px w-2/6 bg-white shadow-lg mx-auto p-8 rounded-xl">
        <div className="mb-10px">
          <label className="form-label mb-24">RFC</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="RFC"
              id="rfc"
              name="rfc"
              onChange={formik.handleChange}
              value={formik.values.rfc}
              disabled={true}
            />
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.rfc}
          </span>
        </div>

        <div className="mb-10px">
          <label className="form-label mb-24">Razón Social</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Razón Social"
              value={formik.values.razonSocial}
              onChange={formik.handleChange}
              name="razonSocial"
              id="razonSocial"
              disabled={true}
            />
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.razonSocial}
          </span>
        </div>

        <div className="mb-10px">
          <label className="form-label mb-24 ">Código Postal</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Código Postal"
              value={formik.values.codigoPostal}
              onChange={formik.handleChange}
              name="codigoPostal"
              id="codigoPostal"
            />
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.codigoPostal}
          </span>
        </div>

        <div className="mb-10px">
          <label className="form-label mb-24">Régimen Fiscal</label>
          <div className="mt-5px">
            <select
              value={formik.values.regimenFiscal}
              className="form-control mb-5px w-full"
              name="regimenFiscal"
              id="regimenFiscal"
              onChange={formik.handleChange}
            >
              <option value="">Selecciona una opción</option>
              {catalogRegime.map((item: any) =>
                item.fisisca === "Sí" ? (
                  <option key={item.clave} value={item.clave}>
                    {item.descripcion}
                  </option>
                ) : null
              )}

              <p>{formik.values.regimenFiscal}</p>
            </select>
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.regimenFiscal}
          </span>
        </div>

        {/* button */}
        <div className="flex justify-center mt-8">
          <button type="submit" className="btn  btn-primary mt-3">
            Actualizar datos
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
