"use client";

import dynamic from "next/dynamic";
import CertificatesForm from '../../components/Forms/Certificates';

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});
export default function CertificatePage() {
  return (
    <MainWrapper>
      <div
        className="panel h-full w-full"
        data-sortable-id="form-stuff-1"
      >
        <section className="m-auto w-9/12">
          <div className="panel-body flex flex-row justify-center gap-10 items-center pb-0 w-full">
            <CertificatesForm />
          </div>
        </section>
      </div>
    </MainWrapper>
  );
}
