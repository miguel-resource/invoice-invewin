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

export default function LoginSupplier() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);

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

    // setMessage("Inicio de sesión correcto");
    // setType("success");
    // setOpen(true);

    // setTimeout(() => {
    //   dispatch(setCompany(formik.values));
    //   router.push("/invoices");
    // }, 2000);

    authCompany(formik.values.user, formik.values.password)
      .then((res) => {  
        if (res.data) {
          setMessage("Inicio de sesión correcto");
          setType("success");
          setOpen(true);

          console.log(res.data);
          setTimeout(() => {
            dispatch(setCompany(res.data));
            router.push("/invoices");
          }, 2000);
        }
      }
      ).catch((err) => {
        setMessage("Usuario o contraseña incorrectos");
        setType("error");
        setOpen(true);
      }
      );
  };

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
          <label className="form-label mb-24">Usuario</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Usuario"
              value={formik.values.user}
              onChange={formik.handleChange}
              name="user"
              id="user"
            />
            {/* <ErrorMessage name="user"/> */}

            <span
              className="text-red-500 text-xs italic"
              style={{ display: "block" }}
            >
              {formik.errors.user}
            </span>
          </div>
        </div>

        <div className="mb-10px">
          <label className="form-label mb-24">Contraseña</label>
          <div className="mt-5px">
            <input
              type="password"
              className="form-control mb-5px w-full"
              placeholder="Contraseña"
              value={formik.values.password}
              onChange={formik.handleChange}
              name="password"
              id="password"
            />

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
