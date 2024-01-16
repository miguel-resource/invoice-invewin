import { useRouter } from "next/navigation";
import { useState } from "react";
import CommonAlert from "@/components/common/Alert";
import { useFormik } from "formik";
import { RFCInitial, RFCSchema } from "@/schemas/RFC";

export default function LoadClientRFC() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);

  const handleInvoice = () => {
    // eslint-disable-next-line no-console

    setMessage("RFC cargado correctamente");
    setType("success");
    setOpen(true);

    setTimeout(() => {
      router.push("/invoice");
    }, 2000);
  };

  const formik = useFormik({
    validationSchema: RFCSchema,
    initialValues: RFCInitial,
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
