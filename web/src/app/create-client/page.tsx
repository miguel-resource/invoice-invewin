"use client";

import dynamic from "next/dynamic";
// import SimpleCreateClient from "@/components/Forms/SimpleCreateClient";
import VerifySupplier from "@/components/Forms/EditSupplier";
import CreateCustomer from "@/components/Forms/CreateCustomer";

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
          <CreateCustomer />
        </div>
      </div>
    </MainWrapper>
  );
}
