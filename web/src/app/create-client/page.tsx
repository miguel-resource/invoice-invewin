"use client";

import dynamic from "next/dynamic";
// import SimpleCreateClient from "@/components/Forms/SimpleCreateClient";
import VerifySupplier from "@/components/Forms/GeneralForm";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function CreateClientPage() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <VerifySupplier />
        </div>
      </div>
    </MainWrapper>
  );
}
