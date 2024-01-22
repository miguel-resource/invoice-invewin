import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";

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

  useLayoutEffect(() => {
    if (!sale.id) {
      router.push("/load-ticket");
    }
  }, []);

  return (
    <div className="panel panel-inverse p-16">
      <div className="border-b-2 border-gray-300 mb-4 ">
        <div className="flex justify-end mb-4 relative">
          <Tooltip title="Editar datos de facturación" arrow placement="top">
            <button
              type="button"
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
          <ul
            className="pl-0
            flex flex-col gap-2
          "
          >
            <li
              className="text-xs
                        text-gray-500
                        font-light"
            >
              <span
                className="text-xs
                            text-gray-500
                            font-semibold"
              >
                Para:{" "}
              </span>
              {client.razonSocial}
            </li>

            <li className=" text-xs text-gray-500 font-light ">
              <span
                className="
                            text-xs
                            text-gray-500
                            font-semibold 
                            "
              >
                De:{" "}
              </span>
              {sale.emisor.razonSocial}
            </li>
          </ul>
        </section>
      </div>

      <div className="flex flex-col justify-between mt-2">
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
      {/* <div className="flex justify-end mb-4 ">
        <button type="button" className="btn btn-md btn-blue mt-2 text-sm">
          <i className="fa fa-pencil text-base mr-2" />
          Editar datos de facturación
        </button>
      </div> */}
    </div>
  );
}
