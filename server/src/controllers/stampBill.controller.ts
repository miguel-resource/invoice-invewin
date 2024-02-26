import axios from "axios";
import SWSapienController from "./swSapien.controller";
import { ClientOnlineController } from "./clientOnline.controller";
import { v4 as uuid } from "uuid";
import { MailerController } from "./mailer.controller";
import Handlebars from "handlebars";

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

    console.log("PAYMENT METHOD");
    console.log(paymentMethod);

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

    // CREATE BILL
    const response = await createBill(
      clientSelector,
      salesSelector,
      paymentMethod
    );

    console.log("RESPONSE");
    console.log(response.data);

    // if (response.status !== 200) {
    //   ctx.throw(response.status, response.data.message);
    // }

    // // SEND MAIL
    MailerController.sendStampBillMail(clientSelector.email, clientSelector.razonSocial);

    ctx.status = 200;
    // ctx.body = accessToken;
  };

  const createBill = async (
    clientSelector: any,
    tickets: any,
    paymentMethod: string
  ) => {
    // GET SERIAL NUMBER OF CERTIFICATE
    const certificate = await SWSapienController.getCertificateSerial(
      tickets[0].emisor.rfc
    );

    const methodPaymentNumber = parseInt(paymentMethod);
    const objectImpNumber = parseInt(tickets[0].detalles[0].objetoImp);

    const data = {
      Version: "4.0",
      Moneda: "MXN",
      Fecha: new Date().toISOString(),
      Serie: "A", // TODO: Change this to the real serie
      Folio: Math.floor(Math.random() * 1000000).toString(),
      TipoDeComprobante: "E",
      Exportacion: "01",
      MetodoPago: "PUE",
      Descuento: "0.00",
      FormaPago:
        methodPaymentNumber < 10 ? `0${methodPaymentNumber}` : paymentMethod,
      Total: tickets
        .reduce((acc: any, ticket: any) => {
          return acc + ticket.total;
        }, 0)
        .toFixed(2),
      SubTotal: tickets
        .reduce((acc: any, ticket: any) => {
          return acc + ticket.total;
        }, 0)
        .toFixed(2),
      LugarExpedicion: clientSelector.codigoPostal,
      NoCertificado: certificate.certificate_number,
      Emisor: {
        Rfc: "EKU9003173C9", // TODO: Change this to the real rfc
        Nombre: "ESCUELA KEMPER URGATE", // TODO: Change this to the real name
        RegimenFiscal: tickets[0].emisor.regimenFiscal,
      },
      Receptor: {
        // Rfc: clientSelector.rfc,
        Rfc: "EKU9003173C9", // TODO: Change this to the real rfc
        Nombre: "ESCUELA KEMPER URGATE", // TODO: Change this to the real name
        DomicilioFiscalReceptor: "42501",
        RegimenFiscalReceptor: clientSelector.regimenFiscal,
        UsoCFDI: clientSelector.usoCfdi,
      },
      ObjetoImp:
        objectImpNumber < 10
          ? `0${objectImpNumber}`
          : tickets[0].detalles.objetoImp,
      Conceptos: tickets.flatMap((ticket: any) => {
        return ticket.detalles.map((detalle: any) => {
          return {
            ClaveProdServ: detalle.claveProdServ,
            Cantidad: detalle.cantidad.toFixed(2).toString(),
            ClaveUnidad: detalle.claveUnidad,
            Unidad: detalle.unidad,
            Descripcion: detalle.descripcion,
            // VALOR UNITARIO = PRECIO UNITARIO + (PRECIO UNITARIO * IVA)
            // ValorUnitario: detalle.valorUnitario,
            ValorUnitario: (
              detalle.valorUnitario +
              detalle.valorUnitario * 0.16 
            ).toFixed(2), // TODO: Change this to the real calculation
            Importe: (
              detalle.valorUnitario +
              detalle.valorUnitario * 0.16
            ).toFixed(2), // TODO: Change this to the real calculation
            Descuento: detalle.descuento.toFixed(2).toString(),
            ObjetoImp: "02", // TODO: Check with invewin if this is correct
            Impuestos:
              // Si objetoImp es 01, 03, 04 o 05 NO se debe enviar el nodo de impuestos
              false
                ? null // TODO: Change this to the real condition
                : {
                    Traslados: detalle.impuestos.map((impuesto: any) => {
                      return {
                        Base: "1.00",
                        TasaOCuota: impuesto.tasaoCouta,
                        Impuesto: impuesto.impuesto,
                        Importe: detalle.importe,
                        TipoFactor: impuesto.tipoFactor,
                      };
                    }),
                    Retenciones: detalle.impuestos.map((impuesto: any) => {
                      return {
                        Base: "1.00",
                        TasaOCuota: impuesto.tasaoCouta, // TODO: Verifica la ortografía
                        Impuesto: impuesto.impuesto,
                        Importe: detalle.importe,
                        TipoFactor: impuesto.tipoFactor,
                      };
                    }),
                  },
          };
        });
      }),
      Impuestos: {
        TotalImpuestosTrasladados: tickets
          .flatMap((ticket: any) => {
            return ticket.detalles.flatMap((detalle: any) => {
              return detalle.impuestos.map((impuesto: any) => {
                return detalle.importe * impuesto.tasaoCouta * detalle.cantidad;
              });
            });
          })
          .reduce((a: any, b: any) => a + b, 0)
          .toFixed(2),
        // TotalImpuestosRetenidos debe ser igual a la suma de los importes de los impuestos retenidos
        TotalImpuestosRetenidos: tickets
          .flatMap((ticket: any) => {
            return ticket.detalles.flatMap((detalle: any) => {
              return detalle.impuestos.map((impuesto: any) => {
                return detalle.importe * impuesto.tasaoCouta * detalle.cantidad;
              });
            });
          })
          .reduce((a: any, b: any) => a + b, 0)
          .toFixed(2),
        Retenciones: tickets.flatMap((ticket: any) => {
          return ticket.detalles.flatMap((detalle: any) => {
            return detalle.impuestos.map((impuesto: any) => {
              return {
                Impuesto: impuesto.impuesto,
                Importe: detalle.importe,
              };
            });
          });
        }),

        Traslados: tickets.flatMap((ticket: any) => {
          return ticket.detalles.flatMap((detalle: any) => {
            return detalle.impuestos.map((impuesto: any) => {
              return {
                Base: "1.00",
                TasaOCuota: impuesto.tasaoCouta,
                Impuesto: impuesto.impuesto,
                Importe: detalle.importe,
                TipoFactor: impuesto.tipoFactor,
              };
            });
          });
        }),
      },
    };

    console.log("DATA");
    console.log(data);

    console.log("RETENCIONES");
    console.log(data.Impuestos.Retenciones);

    console.log("TRASLADOS");
    console.log(data.Impuestos.Traslados);

    console.log("CONCEPTOS");
    console.log(data.Conceptos);

    console.log("CONCEPTOS IMPUESTOS");
    console.log(data.Conceptos[0].Impuestos);

    console.log("IMPUESTOS");
    console.log(data.Impuestos);

    const response = await SWSapienController.createBill(data);

    return response.response;
  };
}

export { StampBillController };
