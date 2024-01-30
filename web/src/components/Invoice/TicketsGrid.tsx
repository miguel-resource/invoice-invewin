import { Chip, Tooltip } from "@mui/material";
import TableGrid from "../common/Table";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { render } from "react-dom";

export const TicketsGrid = () => {
  const sales = useSelector((state: any) => state.sales);

  useEffect(() => {
    console.log("SALES", sales);
  }, [sales]);

  return (
    <section className="mb-10">
      <div>
        <form className="flex items-center justify-between gap-3" action="">
          <label className="form-label mb-24">Folio</label>
          <input
            type="text"
            placeholder="00000000-0000-0000-0000-000000000000"
            className="form-control w-full"
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
