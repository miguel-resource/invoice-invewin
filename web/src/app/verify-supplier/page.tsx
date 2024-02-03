"use client";

import FormVerifySupplier from "@/components/Forms/EditSupplier";
import dynamic from "next/dynamic";


const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function VerifySupplier() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
            <FormVerifySupplier />
        </div>
      </div>
    </MainWrapper>
  );
}
