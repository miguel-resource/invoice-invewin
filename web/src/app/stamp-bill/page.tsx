"use client";

import dynamic from "next/dynamic";
import { Stamp } from "../../components/Invoice/Stamp";
import { useState } from "react";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function StampBillPage() {

  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <Stamp  />
        </div>
      </div>
    </MainWrapper>
  );
}
