"use client";

import dynamic from "next/dynamic";
import FormLoginSupplier from "@/components/Forms/LoginSupplier";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function LoginSupplier() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <FormLoginSupplier />
        </div>
      </div>
    </MainWrapper>
  );
}
