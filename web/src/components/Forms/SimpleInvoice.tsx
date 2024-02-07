import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import CommonAlert from "@/components/common/Alert";
import { useFormik } from "formik";
import { UUIDInitial, UUIDSchema } from "@/schemas/UUID";
import { getSale } from "@/services/Invewin";
import { useDispatch, useSelector } from "react-redux";
import { setSale } from "@/redux/saleSlice";
import ReCAPTCHA from "react-google-recaptcha";


export default function SimpleInvoice() {
  const router = useRouter();
  const [uuid, setUuid] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const dispatch = useDispatch();

  const sales = useSelector((state: any) => state.sales);



  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    getSale(uuid)
      .then((res) => {
        if (res.data) {
          setMessage("Ticket cargado correctamente");
          setType("success");
          setOpen(true);

          dispatch(setSale(res.data));

          setTimeout(() => {
            router.push("/stamp-bill");
          }, 2000);
        }
      })
      .catch((err) => {
        setMessage("El ticket no existe, intente de nuevo");
        setType("error");
        setOpen(true);
      });
  };

  const handleUuidChange = (e: any) => {
    let value = e.target.value.replace(/-/g, "");
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }
    if (value.length > 13) {
      value = value.slice(0, 13) + "-" + value.slice(13);
    }
    if (value.length > 18) {
      value = value.slice(0, 18) + "-" + value.slice(18);
    }
    if (value.length > 23) {
      value = value.slice(0, 23) + "-" + value.slice(23);
    }
    setUuid(value);
  };

  const formik = useFormik({
    validationSchema: UUIDSchema,
    initialValues: UUIDInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      handleInvoice();
    },
  });

  useLayoutEffect(() => {
    console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    if (sales.length > 0) {
      router.push("/stamp-bill");
    }
  }, [sales]);

  return (
    <form
      className="flex items-center justify-center h-full"
      onSubmit={formik.handleSubmit}
    >
      {!isHuman && (
        <ReCAPTCHA
          className="w-fit"
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={() => setTimeout(() => setIsHuman(true), 1000)}
        />
      )}
      {isHuman && (
        <div
          className="row  w-2/6 bg-white shadow-lg mx-auto p-8 rounded-xl"
        >
          <div className="mb-10px mt-2">
            <label className="form-label mb-24">Paso 1</label>
            <p className="text-sm text-gray-500">
              Ingresa tu folio de compra (UUID)
            </p>

            <div className="mt-5px">
              <input
                type="text"
                className="form-control mb-5px w-full"
                placeholder="00000000-0000-0000-0000-000000000000"
                id="uuid"
                name="uuid"
                onChange={(e) => {
                  handleUuidChange(e);
                  formik.handleChange(e);
                }}
                value={uuid}
              />

              <span className="text-xs text-red-500 italic">
                {formik.errors.uuid}
              </span>
            </div>
          </div>
          <div className="mb-10px">
            <label
              className="form-label mb-24"
              style={{ color: "#0C4A81", fontWeight: 700 }}
            >
              Paso 2
            </label>
            <p
              className="text-sm text-gray-500"
              style={{ color: "#0C4A81", fontWeight: 700 }}
            >
              Agrega tus datos de facturación
            </p>
          </div>
          <div className="mb-10px">
            <label
              className="form-label mb-24"
              style={{ color: "#0C4A81", fontWeight: 700 }}
            >
              Paso 3
            </label>
            <p
              className="text-sm text-gray-500"
              style={{ color: "#0C4A81", fontWeight: 700 }}
            >
              Confirme la operación y reciba la factura en su correo
            </p>
          </div>
    
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="btn  btn-primary mt-3"
            // onClick={() => handleInvoice()}
            >
              Cargar Factura
            </button>
          </div>
        </div>
      )}
      <CommonAlert
        message={message}
        type={type}
        onClose={() => setOpen(false)}
        open={open}
      />
    </form>
  );
}
