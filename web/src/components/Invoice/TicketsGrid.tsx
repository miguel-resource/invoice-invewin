import { Chip, Tooltip } from "@mui/material";
import TableGrid from "../common/Table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Props = {
  formik: any;
};

export const TicketsGrid = ({ formik }: Props) => {
  const sales = useSelector((state: any) => state.sales);

  useEffect(() => {
    console.log("SALES", sales);
  }, [sales]);
  

  const handleUuidChange = (e: any) => {
    let value = e.target.value.replace(/-/g, "");
    if (value.length > 8) {
      value = value.slice(0, 8) + "-" + value.slice(8);
    }
    if (value.length > 13) {
      value = value.slice(0, 13) + "-" + value.slice(13);
    }
    if (value.length > 18) {
      value = value.slice(0, 18) + "-" + value.slice(18);
    }
    if (value.length > 23) {
      value = value.slice(0, 23) + "-" + value.slice(23);
    }
   
    formik.setFieldValue("uuid", value);
  }

  return (
    <section className="mb-10">
      <div>
        <form className="flex items-center justify-between gap-3"
        onSubmit={formik.handleSubmit}
        >
          <label className="form-label mb-24">Folio</label>
          <input
              type="text"
              className="form-control mb-5px w-full"
              placeholder="00000000-0000-0000-0000-000000000000"
              id="uuid"
              name="uuid"
              onChange={(e) => {
                handleUuidChange(e);
              }}
              value={formik.values.uuid}
            />

          <button
            type="submit"
            className=" rounded-lg bg-slate-700 hover:bg-slate-600 text-whit px-4 py-2 text-slate-100
            transition duration-300 ease-in-out
            focus:outline-none focus:shadow-outline"
          >
            <i className="fa fa-plus"></i>
          </button>
        </form>

        <div className="mt-10">
          <TableGrid
            data={sales}
            columns={[
              {
                field: "id",
                headerName: "Folio",
                width: 300,
                editable: false,
                headerAlign: "center",
              },
              {
                field: "date",
                headerName: "Fecha",
                width: 190,
                editable: false,
                headerAlign: "center",
              },
    
              {
                field: "subtotal",
                headerName: "Subtotal",
                width: 130,
                editable: false,
                headerAlign: "center",
                cellAlign: "center",
                renderCell: (params: any) => {
                  return (
                    <div className="flex justify-center space-x-2 mx-auto items-center">
                      <p className="text-slate-500 text-base font-medium items-center mb-0">
                        $ {params.value.toFixed(2)}
                      </p>
                    </div>
                  );
                },
              },
              {
                field: "total",
                headerName: "Total",
                width: 130,
                editable: false,
                headerAlign: "center",
                cellAlign: "center",
                renderCell: (params: any) => {
                  return (
                    <div className="flex justify-center space-x-2 mx-auto items-center">
                      <p className="text-slate-500 text-base font-medium items-center mb-0">
                        $ {params.value.toFixed(2)}
                      </p>
                    </div>
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
                      <Tooltip title="Eliminar" arrow>
                        <button className="p-1 w-11 rounded-full  bg-red-500">
                          <i className="fa fa-trash text-slate-100"></i>
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
    </section>
  );
};
