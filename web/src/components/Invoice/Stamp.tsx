import { SearchRFC } from "@/components/Forms/SearchRFC";
import EditClient from "../Forms/EditClient";
import { PaymentMethod } from "./PaymentMethod";
import { TicketsGrid } from "./TicketsGrid";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { RFCInitial, RFCSchema } from "@/schemas/RFC";
import { getClientOnline } from "@/services/ClientOnline";
import { setClient } from "@/redux/clientSlice";
import {
  VerifySupplierInitial,
  VerifySupplierSchema,
} from "@/schemas/VerifySupplier";

type Props = {
  setIsCreatingClient: (isCreatingClient: boolean) => void;
};

export const Stamp = ({ setIsCreatingClient }: Props) => {
  const sale = useSelector((state: any) => state.sales);
  const client = useSelector((state: any) => state.client);
  const router = useRouter();
  const dispatch = useDispatch();

  const [showForms, setShowForms] = useState(false);
  const [isSearchingRFC, setIsSearchingRFC] = useState(false);
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    if (sale.length === 0) {
      router.push("/load-ticket");
    }
  }, [sale]);

  const formikSearchRFC = useFormik({
    validationSchema: RFCSchema,
    initialValues: RFCInitial,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      setShowForms(true);
      setIsSearchingRFC(true);
      getClientOnline(sale[0].emisor.empresaId
        , formikSearchRFC.values.rfc)
        .then((res) => {


          if (
            res.data.codigoEstatus === 404 ||
            res.data.mensaje === "No existe la empresa indicada"
          ) {
            setMessage("RFC no encontrado, debes ingresar tus datos fiscales");
            // setType("error");
            // setOpen(true);


            setTimeout(() => {
              setShowForms(true);
              setIsCreatingClient(true);

            }, 2000);
          } else {
            setMessage("RFC cargado correctamente");
            // setType("success");
            // setOpen(true);

            dispatch(setClient(res.data[0]));


            setTimeout(() => {

              setShowForms(true);
              formikEditSupplier.setFieldValue("razonSocial", res.data[0].razonSocial);
              formikEditSupplier.setFieldValue("usoCfdi", res.data[0].usoCfdi);
              formikEditSupplier.setFieldValue("regimenFiscal", res.data[0].regimenFiscal);
              formikEditSupplier.setFieldValue("codigoPostal", res.data[0].codigoPostal);

              setIsSearchingRFC(false);
            }, 2000);
          }

        })
        .catch((err) => {
          setMessage("RFC no encontrado");
          // setType("error");
          // setOpen(true);
        });
    },
  });

  const formikEditSupplier = useFormik({
    validationSchema: VerifySupplierSchema,
    initialValues: VerifySupplierInitial,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console

      // formikEditSupplier.values.usoCfdi &&
      // formikEditSupplier.values.usoCfdi !== ""
      //   ? formikEditSupplier.values.usoCfdi
      //   : (formikEditSupplier.values.usoCfdi = client.usoCfdi);

      // const data = {
      //   client: formik.values,
      //   clientID: client.id,
      //   companyID: sale.emisor.empresaId,
      // };

      // putClientOnline(data)
      //   .then((res) => {
      //     console.log(res);
      //     setMessage("Datos actualizados correctamente");
      //     setType("success");
      //     setOpen(true);

      //     setTimeout(() => {
      //       // router.push("/load-ticket");
      //       dispatch(setClient(formik.values));
      //       onClose();
      //     }, 2000);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setMessage("Datos no actualizados, intente de nuevo");
      //     setType("error");
      //     setOpen(true);
      //   });
    },
  });

  return (
    <div
      className="flex items-center justify-center h-full"
      //   onSubmit={formik.handleSubmit}
    >
      <div
        className="row mb-15px w-10/12 
          bg-white
          shadow-lg
          mx-auto p-8
          rounded-xl
        "
      >
        <SearchRFC setShowForms={setShowForms} formik={formikSearchRFC} isSearchingRFC={isSearchingRFC} />

        {showForms && (
          <>
           

            <PaymentMethod />
            <EditClient
              formik={formikEditSupplier}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </>
        )}
        <TicketsGrid />
      </div>
    </div>
  );
};

