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
import CommonAlert from "../common/Alert";
import { TotalInvoice } from "./TotalInvoice";
import { ButtonStampInvoice } from "./ButtonStampInvoice";
import { UUIDInitial, UUIDSchema } from "@/schemas/UUID";
import { getSale } from "@/services/Invewin";
import { setSale } from "@/redux/saleSlice";
import { PaymentMethodSchema } from "@/schemas/PaymentMethod";
import { stampBill } from "@/services/StampBill";

export const Stamp = () => {
  const sales = useSelector((state: any) => state.sales);
  const client = useSelector((state: any) => state.client);
  const router = useRouter();
  const dispatch = useDispatch();

  const [showForms, setShowForms] = useState(false);
  const [isSearchingRFC, setIsSearchingRFC] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"success" | "error" | "warning" | "info">(
    "success"
  );
  const [open, setOpen] = useState(false);
  const [isCreatingClient, setIsCreatingClient] = useState(false);
  const [showSearchButton, setShowSearchButton] = useState(true);

  const [isValidToStamp, setIsValidToStamp] = useState(false);

  const formikSearchRFC = useFormik({
    validationSchema: RFCSchema,
    initialValues: RFCInitial,
    validateOnChange: true,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
      setShowForms(true);
      setIsSearchingRFC(true);
      getClientOnline(sales[0].emisor.empresaId, formikSearchRFC.values.rfc)
        .then((res) => {
          if (
            res.data.codigoEstatus === 404 ||
            res.data.mensaje === "No existe la empresa indicada"
          ) {
            setMessage("RFC no encontrado, debes ingresar tus datos fiscales");
            setType("error");
            setOpen(true);
            setIsCreatingClient(true);

            setTimeout(() => {
              setIsSearchingRFC(false);
              setShowForms(true);
            }, 2000);
          } else {
            setMessage(
              "RFC cargado correctamente, verifica tus datos fiscales antes de timbrar"
            );
            setType("success");
            setOpen(true);
            setIsCreatingClient(false);
            setShowSearchButton(false);

            dispatch(setClient(res.data[0]));

            setTimeout(() => {
              setShowForms(true);
              formikEditSupplier.setFieldValue(
                "razonSocial",
                res.data[0].razonSocial
              );
              formikEditSupplier.setFieldValue("usoCfdi", res.data[0].usoCfdi);
              formikEditSupplier.setFieldValue(
                "regimenFiscal",
                res.data[0].regimenFiscal
              );
              formikEditSupplier.setFieldValue(
                "codigoPostal",
                res.data[0].codigoPostal
              );
              formikEditSupplier.setFieldValue("email", res.data[0].email);
              setIsSearchingRFC(false);
              setIsValidToStamp(true);
            }, 2000);
          }
        })
        .catch((err) => {
          setMessage("RFC no encontrado");
          setType("error");
          setOpen(true);
        });
    },
  });

  const formikPaymentMethod = useFormik({
    validationSchema: PaymentMethodSchema,
    initialValues: {
      paymentMethod: "",
    },
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
    },
  });

  const formikEditSupplier = useFormik({
    validationSchema: VerifySupplierSchema,
    initialValues: VerifySupplierInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console
    },
  });

  const formikUUID = useFormik({
    validationSchema: UUIDSchema,
    initialValues: UUIDInitial,
    validateOnChange: true,
    validateOnMount: false,
    onSubmit: (values) => {
      // eslint-disable-next-line no-console

      getSale(formikUUID.values.uuid)
        .then((res) => {
          if (res.data) {
            setMessage("Ticket cargado correctamente");
            setType("success");
            setOpen(true);

            const searchSale = sales.find(
              (sale: any) => sale.id.toLowerCase() === res.data.id.toLowerCase()
            );

            if (searchSale) {
              setMessage("El ticket ya fue cargado");
              setType("error");
              setOpen(true);
              return;
            }

            if (
              sales.length > 0 &&
              res.data.emisor.empresaId !== sales[0].emisor.empresaId
            ) {
              setMessage("El ticket no pertenece a la empresa");
              setType("error");
              setOpen(true);
              return;
            }

            dispatch(setSale(res.data));

            formikUUID.resetForm();
          }
        })
        .catch((err) => {
          setMessage(err.response.data.mensaje || "Error al cargar el ticket");
          setType("error");
          setOpen(true);
        });
    },
  });

  // useLayoutEffect(() => {
  //   if (sales.length === 0 && client.razonSocial === "") {
  //     // router.push("/load-ticket");
  //   }
  // }, [sales]);

  const handleStampBill = () => {
    // eslint-disable-next-line no-console
    const salesSelector = sales;
    const clientSelector = {
      razonSocial: formikEditSupplier.values.razonSocial,
      usoCfdi: formikEditSupplier.values.usoCfdi,
      regimenFiscal: formikEditSupplier.values.regimenFiscal,
      codigoPostal: formikEditSupplier.values.codigoPostal,
      email: formikEditSupplier.values.email,
      id: client.id ? client.id : "",
      rfc: formikSearchRFC.values.rfc,
    };
    const paymentMethod = formikPaymentMethod.values.paymentMethod;

    const data = {
      salesSelector,
      clientSelector,
      paymentMethod,
    };

    stampBill(data)
      .then((res) => {
        console.log(res);

        setMessage("Factura timbrada correctamente");
        setType("success");
        setOpen(true);

        setTimeout(() => {
          window.location.reload();
          router.push("/load-ticket");
        }, 2000);
      })
      .catch((err) => {

        setMessage(err.response.data || "Error al timbrar la factura");
        setType("error");
        setOpen(true);
      });
  };

  return (
    <div className="flex items-center justify-center w-full  py-32">
      <div
        className="row mb-15px w-10/12 
          bg-white
          shadow-lg
          mx-auto p-8
          rounded-xl"
      >
        <SearchRFC
          formik={formikSearchRFC}
          isSearchingRFC={isSearchingRFC}
          showSearchButton={showSearchButton}
        />

        {showForms && (
          <>
            <PaymentMethod formik={formikPaymentMethod} />
            <EditClient
              formik={formikEditSupplier}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
              isCreatingClient={isCreatingClient}
            />
          </>
        )}
        <TicketsGrid formik={formikUUID} />
        <section className="flex flex-row items-center justify-center gap-36 w-full ">
          <TotalInvoice />
          <ButtonStampInvoice
            isValidToStamp={
              (isValidToStamp &&
                formikPaymentMethod.values.paymentMethod !== "") &&
              (formikEditSupplier.isValid &&
                formikEditSupplier.dirty &&
                sales.length > 0)
            }
            handleStampBill={handleStampBill}
          />
        </section>
      </div>

      <CommonAlert
        message={message}
        type={type}
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};
