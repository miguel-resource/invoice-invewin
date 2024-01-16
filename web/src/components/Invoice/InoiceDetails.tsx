import { getCatalogs } from "@/services/Catalog";
import { useEffect, useState } from "react";

export default function InvoiceDetails() {
  const [catalogPayMethod, setCatalogPayMethod] = useState([]);
  const [catalogUseCFDI, setCatalogUseCFDI] = useState([]);

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
    setCatalogPayMethod(res.data.cMetodoPago.c_MetodoPago);
    setCatalogUseCFDI(res.data.cUsoCFDI.c_UsoCFDI);
  };

  useEffect(() => {
    handleGetCatalogs();
  }, []);

  return (
    <div className="panel panel-inverse p-14 w-6/12">
      <ul className="flex flex-col pl-0 gap-3 text-sm font-semibold">
        <li className=" text-slate-700 flex flex-row justify-between ">
          <span className=" text-slate-400 w-1/2">Método de pago:</span>

          <select className="form-select w-1/2">
            <option value="">Selecciona una opción</option>

            {catalogPayMethod.map((item: any) => (
              <option key={item.c_ClaveProdServ} value={item.c_ClaveProdServ}>
                {item.descripcion}
              </option>
            ))}
          </select>
        </li>

        <li className=" text-slate-700 flex flex-row justify-between ">
          <span className=" text-slate-400 w-1/2">Uso de CFDI:</span>

          <select className="form-select w-1/2">
            <option value="">Selecciona una opción</option>
            {catalogUseCFDI.map((item: any) => (
              <option key={item.c_ClaveProdServ} value={item.c_ClaveProdServ}>
                {item.descripcion}
              </option>
            ))}
          </select>
        </li>

        <li className=" text-slate-100 flex flex-row justify-between gap-20">
          <span className=" text-slate-400">Estatus:</span>

          <span className="bg-green-400  rounded-full px-3 py-1 text-xs font-bold text-white">
            Pagado
          </span>
        </li>
      </ul>
    </div>
  );
}
