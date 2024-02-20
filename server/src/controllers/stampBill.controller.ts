import axios from "axios";
import SWSapienController from "./swSapien.controller";
import { ClientOnlineController } from "./clientOnline.controller";
import { v4 as uuid } from "uuid";
import { MailerController } from "./mailer.controller";

import { X509Certificate } from "crypto";

const http = axios.create({
  baseURL: process.env.SW_SAPIEN_API_URL,
  headers: {
    "Content-Type": "application/jsontoxml",
  },
});

namespace StampBillController {
  export const stampBill = async (ctx: any) => {
    const { clientSelector, salesSelector, paymentMethod } = ctx.request.body;
    const accessToken = await SWSapienController.auth();
    const empresaID = salesSelector[0].emisor.empresaId;

    console.log("CLIENT SELECTOR");
    console.log(clientSelector);

    console.log("SALES SELECTOR");
    console.log(salesSelector);

    // VERIFY CLIENT AND CHECK IF NEEDS TO BE UPDATED OR CREATED
    if (clientSelector.id !== "") {
      const client = await ClientOnlineController.getClientByID(
        clientSelector.id,
        empresaID
      );

      if (
        client.razonSocial !== clientSelector.razonSocial ||
        client.usoCfdi !== clientSelector.usoCfdi ||
        client.regimenFiscal !== clientSelector.regimenFiscal ||
        client.codigoPostal !== clientSelector.codigoPostal ||
        client.email !== clientSelector.email
      ) {
        await ClientOnlineController.queryUpdateClient(
          clientSelector.id,
          empresaID,
          clientSelector
        );
      }
    } else {
      // create client
      clientSelector.empresaId = empresaID;
      clientSelector.id = uuid();
      console.log(clientSelector);

      await ClientOnlineController.queryCreateClient(empresaID, clientSelector);
    }

    // GET SERIAL NUMBER OF CERTIFICATE
    const certificate = await SWSapienController.getCertificateSerial(
      salesSelector[0].emisor.rfc
    );

    const data = {
      Version: "4.0",
      Moneda: "MXN",
      Fecha: new Date().toISOString(),
      TipoDeComprobante: "E",
      Exportacion: "01",
      MetodoPago: "PUE",
      Descuento: "0.00",
      FormaPago: paymentMethod,
      NoCertificado: certificate.certificate_number,
      Certificado: certificate.csd_certificate,
      Emisor: {
        Rfc: salesSelector[0].emisor.rfc,
        Nombre: salesSelector[0].emisor.razonSocial,
        RegimenFiscal: salesSelector[0].emisor.regimenFiscal,
      },
      Receptor: {
        Rfc: clientSelector.rfc,
        Nombre: clientSelector.razonSocial,
        DomicilioFiscalReceptor: clientSelector.codigoPostal,
        RegimenFiscalReceptor: clientSelector.regimenFiscal,
        UsoCFDI: clientSelector.usoCfdi
      },
      // Conceptos: salesSelector[0].conceptos,
      // Impuestos: {
      //   TotalImpuestosTrasladados: salesSelector[0].impuestos.totalImpuestosTrasladados,
      //   Traslados: salesSelector[0].impuestos.traslados,
      // },
    };

    console.log("DATA");
    console.log(data);

    // CREATE BILL
    // const response = SWSapienController.createBill(
    //   data
    // );

    // // SEND MAIL
    MailerController.sendStampBillMail(clientSelector.email);

    ctx.status = 200;
    ctx.body = accessToken;
  };
}

export { StampBillController };
