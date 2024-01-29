import { redirect, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import CommonAlert from "@/components/common/Alert";
import { useFormik } from "formik";
import { RFCInitial, RFCSchema } from "@/schemas/RFC";
import { useDispatch, useSelector } from "react-redux";
import { getClientOnline } from "@/services/ClientOnline";
import { setClient } from "@/redux/clientSlice";

export default function LoadClientRFC() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const sale = useSelector((state: any) => state.sales);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!sale.id) {
      redirect("/load-ticket");
    }
  }, []);

  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    getClientOnline(sale.emisor.empresaId, formik.values.rfc)
      .then((res) => {

        if (
          res.data.codigoEstatus === 404 ||
          res.data.mensaje === "No existe la empresa indicada"
        ) {
          setMessage("RFC no encontrado");
          setType("error");
          setOpen(true);


          setTimeout(() => {
            router.push("/create-client");
          }, 2000);
        }else{
          setMessage("RFC cargado correctamente");
          setType("success");
          setOpen(true);

          dispatch(setClient(res.data[0]));

          setTimeout(() => {
            router.push("/invoice");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage("RFC no encontrado");
        setType("error");
        setOpen(true);
      });

    console.log("RFC cargado correctamente", formik.values.rfc, sale.id);
  };

  const formik = useFormik({
    validationSchema: RFCSchema,
    initialValues: RFCInitial,
    validateOnBlur: true,
    onSubmit: (values) => {
      handleInvoice();
    },
  });

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

            <span
              className="text-red-500 text-xs italic"
              style={{ display: "block" }}
            >
              {formik.errors.rfc}
            </span>
          </div>
        </div>

        {/* button */}
        <div className="flex justify-center mt-8">
          <button
            className="btn  btn-primary mt-3"
            onClick={() => handleInvoice()}
          >
            Carga RFC del Cliente
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
