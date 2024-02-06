"use client";

import TableGrid from "@/components/common/Table";
import dynamic from "next/dynamic";
import { Chip, Tooltip } from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { getAllInvoices } from "@/services/Company";
import { useSelector } from "react-redux";

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});
export default function InvoicePage() {




  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="flex items-center justify-center h-full w-11/12 mx-auto mt-20 mb-20">
          <TableGrid
            columns={[
              {
                field: "date",
                headerName: "Fecha",
                type: "date",
                width: 130,
                editable: false,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "serie",
                headerName: "Serie",
                width: 120,
                editable: false,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "folio",
                headerName: "Folio",
                width: 300,
                editable: false,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "rfcClient",
                headerName: "RFC del Cliente",
                width: 200,
                editable: false,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "nameClient",
                headerName: "Razón Social",
                width: 300,
                editable: false,
                headerAlign: "center",
                cellAlign: "left",
                align: "center",
              },
              {
                field: "total",
                headerName: "Total",
                width: 130,
                editable: false,
                headerAlign: "center",
                cellAlign: "center",
                align: "center",
              },
              {
                field: "methodPayment",
                headerName: "Método de Pago",
                width: 130,
                editable: false,
                headerAlign: "center",
                renderCell: (params: any) => {
                  return (
                    <Chip
                      label={params.value}
                      className=" text-slate-100"
                      variant="outlined"
                      color="success"
                    />
                  );
                },
              },
              {
                field: "actions",
                headerName: "",
                width: 470,
                headerAlign: "center",
                renderCell: () => {
                  return (
                    <div className="flex justify-center space-x-2 mx-auto">
                      <Tooltip title="Ver" arrow placement="right">
                        <button className="p-1 w-11 rounded-full  ">
                          <i className="fa fa-eye text-slate-700"></i>
                        </button>
                      </Tooltip>

                     
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </MainWrapper>
  );
}
