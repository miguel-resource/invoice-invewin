import {
  VerifySupplierInitial,
  VerifySupplierSchema,
} from "@/schemas/VerifySupplier";
import { getCatalogs } from "@/services/Catalog";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CommonAlert from "../common/Alert";
import { postClientOnline } from "@/services/ClientOnline";
import { useSelector } from "react-redux";

export default function CreateCustomer() {
  const router = useRouter();
  const sale = useSelector((state: any) => state.sales);

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [catalogRegime, setCatalogRegime] = useState([]);
  const [catalogUseCFDI, setCatalogUseCFDI] = useState([]);

  const handleInvoice = (values: any) => {
    // eslint-disable-next-line no-console

    const body = {
      empresaID: sale.emisor.empresaId,
      client: values,
    };

    console.log(body);

    postClientOnline(body)
      .then((res) => {
        console.log(res.data);
        setMessage("Datos actualizados correctamente");
        setType("success");
        setOpen(true);

        setTimeout(() => {
          router.push("/load-ticket");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setMessage("RFC no encontrado");
        setType("error");
        setOpen(true);
      });
  };

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
    setCatalogRegime(res.data.cRegimenFiscal.c_RegimenFiscal);
    setCatalogUseCFDI(res.data.cUsoCFDI.c_UsoCFDI);
  };

  const formik = useFormik({
    validationSchema: VerifySupplierSchema,
    initialValues: VerifySupplierInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      handleInvoice(values);
    },
  });

  useEffect(() => {
    handleGetCatalogs();
  }, []);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="row mb-15px w-2/6
            bg-white
            shadow-lg
            mx-auto p-8
            rounded-xl
          "
      >
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
            />
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.rfc}
          </span>
        </div>

        <div className="mb-10px">
          <label className="form-label mb-24">Email</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              id="email"
            />
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.email}
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

        <div className="mb-10px">
          <label className="form-label mb-24">Uso de CFDI</label>
          <div className="mt-5px">
            <select
              value={formik.values.usoCfdi}
              className="form-control mb-5px w-full"
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

        {/* button */}
        <div className="flex justify-center mt-8">
          <button type="submit" className="btn  btn-primary mt-3">
            Crear Cliente
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
