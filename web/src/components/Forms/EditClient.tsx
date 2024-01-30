import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonAlert from "@/components/common/Alert";

import validateRfc from "validate-rfc";

import { useFormik } from "formik";
import {
  VerifySupplierInitial,
  VerifySupplierSchema,
} from "../../schemas/VerifySupplier";

import { getCatalogs } from "@/services/Catalog";
import { useDispatch, useSelector } from "react-redux";
import { putClientOnline } from "@/services/ClientOnline";
import { setClient } from "@/redux/clientSlice";

type Props = {
  onClose: () => void;
  formik: any;
  isCreatingClient: boolean;
};

export default function EditClient({ onClose, formik, isCreatingClient }: Props) {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [catalogRegime, setCatalogRegime] = useState([]);
  const [catalogUseCFDI, setCatalogUseCFDI] = useState([]);

  // const client = useSelector((state: any) => state.client);
  const sale = useSelector((state: any) => state.sales);

  const dispatch = useDispatch();


  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
   
    setCatalogRegime(res.data.cRegimenFiscal.c_RegimenFiscal);
    setCatalogUseCFDI(res.data.cUsoCFDI.c_UsoCFDI);
  };



  useEffect(() => {
    handleGetCatalogs();
    // formik.setFieldValue("rfc", sale[0].emisor.rfc);
    formik.setFieldValue("razonSocial", formik.values.razonSocial);
    formik.setFieldValue("codigoPostal", formik.values.codigoPostal);
    formik.setFieldValue("regimenFiscal", formik.values.regimenFiscal);
  }, [formik.values]);

  return (
    <form
      className="flex items-center justify-center h-full border-b-2 border-slate-200 mb-8"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="  w-full
          bg-white
          mx-auto mt-4
          rounded-xl
        "
      >
        <div className="mb-10px flex justify-between gap-3 ">
          <div className="mb-10px w-full">
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
              />
            </div>
          </div>

          <div className="mb-10px w-full">
            <label className="form-label mb-24">Email</label>
            <div className="mt-5px">
              <input
                type="email"
                className="form-control w-full"
                placeholder="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                
              />
            </div>

            <span className="text-xs text-red-500 italic" id="rfc-helper-text">
              {formik.errors.rfc && formik.touched.rfc
                ? formik.errors.rfc
                : null}
            </span>
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.razonSocial && formik.touched.razonSocial
              ? formik.errors.razonSocial
              : null}
          </span>
        </div>

        <div className="mb-10px flex justify-between gap-4">
          <div className="mb-10px w-1/3">
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
              {formik.errors.codigoPostal && formik.touched.codigoPostal
                ? formik.errors.codigoPostal
                : null}
            </span>
          </div>

          <div className="mb-10px w-1/3">
            <label className="form-label mb-24">Régimen Fiscal</label>
            <div className="mt-5px">
              <select
                value={formik.values.regimenFiscal}
                className="form-control form-select mb-5px w-full"
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

          <div className="mb-10px w-1/3">
            <label className="form-label mb-24">Uso de CFDI</label>
            <div className="mt-5px">
              <select
                value={formik.values.usoCfdi}
                className="form-control form-select mb-5px w-full"
                name="usoCfdi"
                id="usoCfdi"
                onChange={formik.handleChange}
              >
                <option value="">Selecciona una opción</option>
              {catalogUseCFDI.map((item: any) => (
                <option key={item.clave} value={item.clave}>
                  {item.descripcion}
                </option>
              ))}

                {/* <p>{formik.values.regimenFiscal}</p> */}
              </select>
            </div>

            <span className="text-xs text-red-500 italic" id="rfc-helper-text">
              {formik.errors.usoCfdi}
            </span>
          </div>
        </div>

        {/* <div className="flex justify-center mt-8">
          <button
            disabled={!formik.isValid}
            type="submit"
            className="btn  btn-primary mt-3"
          >
            Actualizar datos
          </button>
        </div> */}
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
