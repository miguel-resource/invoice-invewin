"use client";

import TableGrid from "@/components/common/Table";
import dynamic from "next/dynamic";


const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});
export default function InvoicePage() {



  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-fit"
        data-sortable-id="form-stuff-1"
      >
        <div className="flex items-center justify-center h-full w-11/12 mx-auto mt-20 mb-20">
          <TableGrid/>
        </div>
      </div>
    </MainWrapper>
  );
}
