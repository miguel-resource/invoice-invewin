"use client";

import dynamic from "next/dynamic";
import { Stamp } from "../../components/Invoice/Stamp";
import { useState } from "react";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});

export default function StampBillPage() {
  const [isCreatingClient, setIsCreatingClient] = useState(false);

  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <Stamp setIsCreatingClient={setIsCreatingClient} />
        </div>
      </div>
    </MainWrapper>
  );
}
