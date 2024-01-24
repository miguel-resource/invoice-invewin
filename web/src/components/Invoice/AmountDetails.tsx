import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { Box, Modal } from "@mui/material";
import EditClient from "../Forms/EditClient";
import { getCatalogs } from "@/services/Catalog";

const details = [
  {
    name: "Subtotal",
    value: "$ 1000.00",
  },
  {
    name: "Total",
    value: "$ 1000.00",
  },
];

export default function AmountDetails() {
  const router = useRouter();
  const sale = useSelector((state: any) => state.sales);
  const client = useSelector((state: any) => state.client);

  const [open, setOpen] = useState(false);
  const [catalogPayMethod, setCatalogPayMethod] = useState([]);

  useLayoutEffect(() => {
    if (!sale.id) {
      router.push("/load-ticket");
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
    setCatalogPayMethod(res.data.cMetodoPago.c_MetodoPago);
  };

  useEffect(() => {
    handleGetCatalogs();
  }, []);

  return (
    <div className="panel panel-inverse p-16">
      <div className="border-b-2 border-gray-300 mb-4 ">
        <div className="flex justify-end mb-4 relative">
          <Tooltip title="Editar datos de facturación" arrow placement="top">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className=" rounded-full  p-2 px-3 text-slate-500 mt-2 text-sm hover:bg-slate-800 hover:text-slate-100  ease-in-out duration-150"
            >
              <i className="fa fa-pencil text-base " />
            </button>
          </Tooltip>
        </div>

        <h3
          className="text-base
            font-bold
            text-gray-500"
        >
          {sale.id}
        </h3>

        <section>
          <ul className="pl-0 flex flex-col gap-2">
            <li className="text-xs text-gray-500 font-light">
              <span className="text-xs text-gray-500 font-semibold">
                Para:{" "}
              </span>
              {client.razonSocial}
            </li>

            <li className=" text-xs text-gray-500 font-light ">
              <span className=" text-xs text-gray-500 font-semibold">De: </span>
              {sale.emisor.razonSocial}
            </li>
          </ul>
        </section>
      </div>

      <div className="flex flex-col justify-between mt-2">
        <div className="flex justify-between items-center gap-12 mb-8">
          <span
            className="text-sm text-slate-800 font-semibold
          "
          >
            Método de pago:
          </span>

          <select className="form-select form-control w-1/2">
            <option value="">Selecciona una opción</option>

            {catalogPayMethod.map((item: any) => (
              <option key={item.c_ClaveProdServ} value={item.c_ClaveProdServ}>
                {item.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between items-center ">
          <p className="text-lg  text-basete-400 font-semibold ">Subtotal</p>
          <p className="text-lg  text-basete-400 font-semibold ">
            $ {sale.subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center ">
          <p className="text-2xl text-slate-700 font-semibold ">Total</p>
          <p className=" text-2xl text-gray-700 font-semibold ">
            $ {sale.total.toFixed(2)}
          </p>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
          }}
        >
          <EditClient onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
