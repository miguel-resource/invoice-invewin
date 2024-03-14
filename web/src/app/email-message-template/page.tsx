"use client"

import CreateEmailTemplete from "@/components/Forms/CreateEmailTemplete";
import dynamic from "next/dynamic";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function EmailMessageTemplatePage() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <CreateEmailTemplete />
        </div>
      </div>
    </MainWrapper>
  );
}
