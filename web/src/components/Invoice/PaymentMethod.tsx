import { getCatalogs } from "@/services/Catalog";
import { useEffect, useState } from "react";

export const PaymentMethod = () => {
  const [catalogPayMethod, setCatalogPayMethod] = useState([]);

  const handleGetCatalogs = async () => {
    const res = await getCatalogs();
    setCatalogPayMethod(res.data.cMetodoPago.c_MetodoPago);
  };

  useEffect(() => {
    handleGetCatalogs();
  }, []);
  

  return (
    <form
      className="flex  justify-center h-full gap-2 flex-col border-b-2 pb-10"
      //   onSubmit={formik.handleSubmit}
    >
      <label className="form-label">Método de pago</label>

      <div className="w-full flex flex-row gap-2">
        <select name="paymentMethod" id="paymentMethod" className="form-control form-select mb-5px w-full">
            <option value="">Selecciona una opción</option>
          {catalogPayMethod.map((method: any) => (
            <option key={method.id} value={method.id}>
              {method.descripcion}
            </option>
          ))}
          
        </select>

      </div>
    </form>
  );
};
