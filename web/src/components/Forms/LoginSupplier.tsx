import CommonAlert from "../common/Alert";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useFormik } from "formik";
import {
  LogginSupplierInitial,
  LogginSupplierSchema,
} from "@/schemas/LoginSupplier";
import { useDispatch } from "react-redux";
import { setCompany } from "@/redux/companySlice";
import { authCompany } from "@/services/Company";
import { setLoginCompany } from "@/redux/loginCompanySlice";

export default function LoginSupplier() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: LogginSupplierSchema,
    initialValues: LogginSupplierInitial,
    onSubmit: (values) => {
      handleInvoice();
    },
  });

  const handleInvoice = () => {
    // eslint-disable-next-line no-console
    dispatch(setLoginCompany(formik.values));

    authCompany(formik.values.email, formik.values.password)
      .then((res) => {
        if (res.data) {
          setMessage("Inicio de sesión correcto");
          setType("success");
          setOpen(true);
          console.log("authCompany -> res.data", res.data);
          dispatch(setCompany(res.data));

          setTimeout(() => {
            router.push("/invoices");
          }, 2000);
        }
      })
      .catch((err) => {
        setMessage("Usuario o contraseña incorrectos");
        setType("error");
        setOpen(true);
      });
  };

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="row w-2/6
          bg-white
          shadow-lg
          mx-auto p-8
          rounded-xl
        "
      >
        <div className="m mb-6">
          <label className="form-label mb-24">Usuario</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Usuario"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
              id="email"
            />
            {/* <ErrorMessage name="user"/> */}

            <span
              className="text-red-500 text-xs italic"
              style={{ display: "block" }}
            >
              {formik.errors.email}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label mb-24">Contraseña</label>
          <div className="mt-5px">
            <div
              className="flex justify-between   w-full"
            >
              <input
                type={showPassword ? "text" : "password"}
                className="form-control w-full mr-3"
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                id="password"
              />

              {/* button to show password */}
              <button
                // type=""
                type="button"
                className="bg-slate-100 p-2 px-3 rounded-md hover:bg-slate-400 ease-in-out duration-200 group"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <i className="fas fa-eye text-slate-500 group-hover:text-slate-100"></i>
              </button>
            </div>

            <span
              className="text-red-500 text-xs italic"
              style={{ display: "block" }}
            >
              {formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </span>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-center mt-8">
          <button type="submit" className="btn  btn-primary mt-3">
            INICIAR SESIÓN
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
