"use client";

import dynamic from "next/dynamic";
import SimpleLoadClient from "@/components/Forms/SimpleLoadClient";


const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function LoadClientRFC() {
  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <SimpleLoadClient />
        </div>
      </div>
    </MainWrapper>
  );
}
