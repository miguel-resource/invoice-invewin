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
import { getCompanyData, updateCompany } from "@/services/Company";

export default function VerifySupplier() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [catalogRegime, setCatalogRegime] = useState([]);
  const [dataIsChanged, setDataIsChanged] = useState(false);

  const companySelector = useSelector((state: any) => state.company);
  const companyLogin = useSelector((state: any) => state.loginCompany);

  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    const company = {
      ...formik.values,
      claveRegimenFiscal: formik.values.regimenFiscal.split(" - ")[0],
      regimenFiscal: formik.values.regimenFiscal.split(" - ")[1],
      serieFacturacion: "A",
      id: companySelector.id,
    };

    const data = {
      company,
      userName: companyLogin.email,
      password: companyLogin.password,
    }



    updateCompany(data).then((res) => {
      setMessage("Datos actualizados correctamente");
      setType("success");
      setOpen(true);

      setTimeout(() => {
        router.push("/load-ticket");
      }, 2000);
    }
    ).catch((err) => {
      setMessage("Error al actualizar los datos");
      setType("error");
      setOpen(true);
    });

  };

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();

    setCatalogRegime(res.data.cRegimenFiscal.c_RegimenFiscal);
  };

  const handleGetCompany = async () => {
    // eslint-disable-next-line no-console
    console.log("get company");

    const res = await getCompanyData(companyLogin.email);
    console.log("Company", res.data);


    formik.setFieldValue("rfc", res.data.rfc);
    formik.setFieldValue("razonSocial", res.data.razonSocial);
    formik.setFieldValue("codigoPostal", res.data.codigoPostal);
    formik.setFieldValue("regimenFiscal", res.data.claveRegimenFiscal + " - " + res.data.regimenFiscal);
    formik.setFieldValue("email", res.data.email);

  }

  const handleCheckChanges = () => {
    if (
      formik.values.rfc !== companySelector.rfc ||
      formik.values.razonSocial !== companySelector.razonSocial ||
      formik.values.email !== companySelector.email ||
      formik.values.codigoPostal !== companySelector.codigoPostal ||
      formik.values.regimenFiscal !==
      companySelector.claveRegimenFiscal + " - " + companySelector.regimenFiscal
    ) {
      setDataIsChanged(true);
    } else {
      setDataIsChanged(false);
    }
  }

  const formik = useFormik({
    validationSchema: VerifySupplierSchema,
    initialValues: VerifySupplierInitial,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values) => {
      handleInvoice();
    },
  });

  useEffect(() => {
    handleGetCatalogs();
    handleGetCompany();


  }, []);

  useLayoutEffect(() => {
    handleCheckChanges();
  }, [formik.values]);

  useLayoutEffect(() => {
    if (!companySelector.rfc) {
      router.push("/login-supplier");
    }
  }, []);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="row  w-7/12 bg-white shadow-lg mx-auto p-8 rounded-xl">
        <div className="mb-10px grid grid-cols-2 gap-10">
          <div>
            <label className="form-label mb-24">RFC</label>
            <div className="mt-5px">
              <input
                type="text"
                className="form-control mb-5px w-full"
                placeholder="RFC"
                id="rfc"
                name="rfc"
                onChange={
                  formik.handleChange
                }
                value={formik.values.rfc}
                disabled={true}
              />
            </div>

            <span className="text-xs text-red-500 italic" id="rfc-helper-text">
              {formik.errors.rfc}
            </span>
          </div>
          <div>
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
        </div>

        <div className="mb-10px grid grid-cols-2 gap-10">
          <div>
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

          <div>
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
        </div>



        <div className="mb-20px">
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
                  <option key={item.clave}
                    value={
                      item.clave + " - " + item.descripcion
                    }>
                    {item.clave} - {item.descripcion}
                  </option>
                ) : null
              )}

            </select>
          </div>

          <span className="text-xs text-red-500 italic" id="rfc-helper-text">
            {formik.errors.regimenFiscal}
          </span>
        </div>

        {/* button */}
        <div className="flex justify-center mt-24">
          <button type="submit"
            className={
              formik.isValid && dataIsChanged
                ? "btn btn-primary w-1/2"
                : "btn disabled w-1/2"
            }
            disabled={!formik.isValid && !dataIsChanged}
          >
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
