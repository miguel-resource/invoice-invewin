import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function CreateEmailTemplete() {
  const companyLogin = useSelector((state: any) => state.loginCompany);
  const router = useRouter();

  useLayoutEffect(() => {
    if (companyLogin.email === "" && companyLogin.password === "") {
      router.push("/login-supplier");
    }
  }, [companyLogin]);
  return (
    <form
      className="flex items-center justify-center h-full"
      // onSubmit={formik.handleSubmit}
    >
      <div
        className="row w-2/6
          bg-white
          shadow-lg
          mx-auto p-8
          rounded-xl
        "
      >
        <div className="mb-6">
          <label className="form-label mb-24">Asunto</label>
          <div className="mt-5px">
            <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="Asunto"
              //   value={formik.values.email}
              //   onChange={formik.handleChange}
              name="email"
              id="email"
            />
            {/* <ErrorMessage name="user"/> */}

            <span
              className="text-red-500 text-xs italic"
              style={{ display: "block" }}
            >
              {/* {formik.errors.email} */}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="form-label mb-24">Mensaje</label>
          <div className="mt-5px">
            <textarea
              className="form-control mb-5px w-full"
              placeholder="Mensaje"
              //   value={formik.values.password}
              //   onChange={formik.handleChange}
              name="message"
              id="message"
            />
          </div>
        </div>

        <div className="flex justify-center w-full">
          <button type="submit" className="btn  btn-primary mt-3 px-3">
            Crear
          </button>
        </div>
      </div>
    </form>
  );
}
