import { useEffect } from "react";
import { useSelector } from "react-redux";

export const TotalInvoice = () => {
  const sales = useSelector((state: any) => state.sales);
  const total = sales.map((sale: any) => sale.total);



  return (
    <div>
      <p
        className="text-right text-slate-700 mb-0 tracking-widest"
        style={{ fontSize: "1.5rem", fontWeight: "bold" }}
      >
        <span>Total: ${total.length === 0 ? 0 : total.map((t: any) => t).reduce((a: any, b: any) => a + b).toFixed(2)}</span>
      </p>
    </div>
  );
};
