"use client";

import dynamic from "next/dynamic";
import AmountDetails from "@/components/Invoice/AmountDetails";
import CommonAlert from "@/components/common/Alert";
import { useLayoutEffect, useState } from "react";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function InvoicePage() {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);

  const handleInvoice = () => {
    console.log("Timbrar factura");
    setMessage("Factura timbrada correctamente");
    setType("success");
    setOpen(true);
  };

  return (
    <MainWrapper>
      <div
        className="panel h-full w-full
        
      "
        data-sortable-id="form-stuff-1"
      >
        <section className="m-auto w-10/12">
          <div className="panel-body flex flex-row justify-center gap-10 items-center pb-0 w-full">
            <AmountDetails />
            {/* <InvoiceDetails /> */}
          </div>

          <div
            className="
            flex
            justify-center
            
            pb-5
        "
          >
            <button
              onClick={handleInvoice}
              type="button"
              className="btn btn-primary w-3/12 mt-0"
            >
              Timbrar
            </button>
          </div>
        </section>
      </div>

      <CommonAlert
        message={message}
        type={type}
        onClose={() => setOpen(false)}
        open={open}
      />
    </MainWrapper>
  );
}
