import { useRouter } from "next/navigation";
import { useState } from "react";
import CommonAlert from "@/components/common/Alert";
import { useFormik } from "formik";
import { UUIDInitial, UUIDSchema } from "@/schemas/UUID";

export default function SimpleInvoice() {
  const router = useRouter();
  const [uuid, setUuid] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);

  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    setMessage("Ticket cargado correctamente");
    setType("success");
    setOpen(true);

    setTimeout(() => {
      router.push("/load-client");
    }, 2000);
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
      console.log(values);
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
          <label className="form-label mb-24">Número de Ticket (UUID)</label>
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

        {/* button */}
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

      <CommonAlert
        message={message}
        type={type}
        onClose={() => setOpen(false)}
        open={open}
      />
    </form>
  );
}
