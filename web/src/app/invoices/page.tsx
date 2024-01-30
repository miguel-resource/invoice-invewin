"use client";

import TableGrid from "@/components/common/Table";
import dynamic from "next/dynamic";
import { fa, faker, he } from "@faker-js/faker";
import { Chip, Tooltip } from "@mui/material";
import { render } from "react-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllInvoices } from '../../services/Company';

const MainWrapper = dynamic(() => import("@/components/MainWrapper/layaout"), {
  ssr: false,
});
export default function InvoicePage() {
  const createRandomInvoice = () => {
    return {
      id: faker.datatype.uuid(),
      date: faker.date.anytime(),
      folio: faker.datatype.uuid(),
      serie: faker.date.anytime().getFullYear(),
      rfcClient: faker.datatype.number(),
      nameClient: faker.person.fullName(),
      total: "$ " + faker.finance.amount(),
      methodPayment: faker.helpers.shuffle([
        "Efectivo",
        "Tarjeta",
        "Transferencia",
      ])[0],
      // actions: faker.datatype.number(),
    };
  };

  const data = faker.helpers.multiple(createRandomInvoice, {
    count: 10,
  });
  // const [data, setData] = useState([]);

  // const companyLogin = useSelector((state: any) => state.loginCompany);


  // useEffect (() => {
  //   handleGetInvoices();
  // }, []);


  // const handleGetInvoices = async () => {
  //   const res = await getAllInvoices(companyLogin.email);
  //   setData(res.data);
  // }


  return (
    <MainWrapper>
      <div
        className="panel panel-inverse h-full"
        data-sortable-id="form-stuff-1"
      >
        <div className="panel-body">
          <TableGrid
            data={data}
            columns={[
              {
                field: "date",
                headerName: "Fecha",
                type: "date",
                width: 130,
                editable: false,
                headerAlign: "center",
              },
              {
                field: "serie",
                headerName: "Serie",
                width: 120,
                editable: false,
                headerAlign: "center",
              },
              {
                field: "folio",
                headerName: "Folio",
                width: 300,
                editable: false,
                headerAlign: "center",
              },
              {
                field: "rfcClient",
                headerName: "RFC del Cliente",
                width: 200,
                editable: false,
                headerAlign: "center",
              },
              {
                field: "nameClient",
                headerName: "Razón Social",
                width: 300,
                editable: false,
                headerAlign: "center",
                cellAlign: "center",
              },
              {
                field: "total",
                headerName: "Total",
                width: 130,
                editable: false,
                headerAlign: "center",
                cellAlign: "center",
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
                headerName: "Acciones",
                width: 470,
                headerAlign: "center",
                renderCell: () => {
                  return (
                    <div className="flex justify-center space-x-2 mx-auto">
                      <Tooltip title="Ver" arrow>
                        <button className="p-1 w-11 rounded-full  bg-slate-500">
                          <i className="fa fa-eye text-slate-100"></i>
                        </button>
                      </Tooltip>

                      <Tooltip title="Descargar" arrow>
                        <button className="p-1 w-11 rounded-full bg-blue-500">
                          <i className="fa fa-download text-slate-100"></i>
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
