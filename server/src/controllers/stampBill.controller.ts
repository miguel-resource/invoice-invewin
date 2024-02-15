import axios from "axios";
import SWSapienController from "./swSapien.controller";
import { ClientOnlineController } from "./clientOnline.controller";
import { v4 as uuid } from "uuid";
import { MailerController } from "./mailer.controller";

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

    // requet to SW Sapien
    // const res = await http
    //   .post(
    //     process.env.SW_SAPIEN_API_URL + "/v3/cfdi33/issue/json/v4",
    //     { data },
    //     {
    //       headers: {
    //         Authorization: `bearer ${accessToken
    //           .replace(/\n/g, "")
    //           .replace(/\s/g, "")}`,
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   .catch((error) => {
    //     ctx.throw(400, error.response.data.message);
    //   });

    // SEND MAIL
    MailerController.sendStampBillMail(clientSelector.email);

    ctx.status = 200;
    ctx.body = accessToken;
  };
}

export { StampBillController };
