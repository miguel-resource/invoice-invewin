"use client";

import dynamic from "next/dynamic";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
    ssr: false,
  });
export default function InvoicePage() {

    return (
        <MainWrapper>
            <div
                className="panel h-full w-full"
                data-sortable-id="form-stuff-1"
            >
                <section className="m-auto w-10/12">
                    <div className="panel-body flex flex-row justify-center gap-10 items-center pb-0 w-full">
                        <h1>Invoice</h1>
                    </div>
                </section>
            </div>
        </MainWrapper>
    );

}