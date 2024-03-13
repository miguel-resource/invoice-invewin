import axios from "axios";
import SWSapienController from "./swSapien.controller";
import { ClientOnlineController } from "./clientOnline.controller";
import { v4 as uuid } from "uuid";
import { MailerController } from "./mailer.controller";
import { DocumentsCFDController } from "./documentosCFD.controller";

namespace StampBillController {
  export const stampBill = async (ctx: any) => {
    const { clientSelector, salesSelector, paymentMethod } = ctx.request.body;
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

      await ClientOnlineController.queryCreateClient(empresaID, clientSelector);
    }

    // CREATE BILL
    const response = await createBill(
      clientSelector,
      salesSelector,
      paymentMethod
    );

    console.log("RESPONSE");
    console.log(response);

    if (!response) {
      ctx.throw(400, "Error al crear factura");
      return;
    }

    // await DocumentsCFDController.queryCreateDocument(empresaID, response, paymentMethod);

    // // SEND MAIL
    if (response.cfdi) {
      MailerController.sendStampBillMail(
        clientSelector.email,
        clientSelector.razonSocial,
        response.cfdi
      );
    }

    ctx.status = 200;
    ctx.body = response.data ? response.data : response;
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
          return acc + ticket.subtotal;
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
            ValorUnitario: detalle.valorUnitario.toFixed(2), // TODO: Change this to the real calculation
            Importe: (detalle.valorUnitario * detalle.cantidad).toFixed(2),
            Descuento: detalle.descuento.toFixed(2).toString(),
            ObjetoImp: "02", // TODO: Check with invewin if this is correct
            Impuestos:
              // Si objetoImp es 01, 03, 04 o 05 NO se debe enviar el nodo de impuestos
              false
                ? null // TODO: Change this to the real condition
                : {
                    Traslados: detalle.impuestos.map((impuesto: any) => {
                      return {
                        Base: detalle.valorUnitario.toFixed(2),
                        TasaOCuota: impuesto.tasaoCouta,
                        Impuesto: impuesto.impuesto,
                        Importe: (
                          detalle.valorUnitario *
                          parseFloat(impuesto.tasaoCouta)
                        ).toFixed(2),
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
        Traslados: tickets.flatMap((ticket: any) => {
          return ticket.detalles.flatMap((detalle: any) => {
            return detalle.impuestos.map((impuesto: any) => {
              return {
                Base: detalle.valorUnitario.toFixed(2),
                TasaOCuota: impuesto.tasaoCouta,
                Impuesto: impuesto.impuesto,
                Importe: parseFloat(
                  (
                    detalle.valorUnitario * parseFloat(impuesto.tasaoCouta)
                  ).toFixed(2)
                ),
                TipoFactor: impuesto.tipoFactor,
              };
            });
          });
        }),
      },
    };

    const response = await SWSapienController.createBill(data);

    return response;
  };
}

export { StampBillController };
