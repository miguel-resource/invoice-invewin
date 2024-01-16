
"use client";

import SimpleInvoice from "@/components/Forms/SimpleInvoice";
import dynamic from "next/dynamic";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});
export default function LoadTicket() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <SimpleInvoice />
        </div>
      </div>
    </MainWrapper>
  );
}
