import axios from "axios";

import UserController from "./user.controller";

import { User } from "../types/User";
import { InvewinController } from "./invewin.controller";
import { v4 as uuid } from "uuid";
const http = axios.create({
  baseURL: process.env.INVEWIN_API_URL,
});

namespace CerfificatesController {
  export async function getCertificates(ctx: any) {
    const { userName, password } = ctx.request.body;

    const userNameRoute = userName.replace("@", "%40");
    const user: User = await UserController.getUser(userNameRoute);

    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );
    console.log(accessToken);

    const data = await http.get(
      process.env.INVEWIN_API_URL +
      "/empresas/" +
      user.empresaId +
      "/certificadoscsd",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).catch((error) => {
      console.log("ERROR", error.response.data);
    });

    if (data === undefined) {
      ctx.status = 400;
      ctx.body = { message: "Error" };
      return;
    }

    ctx.status = 200;
    ctx.body = data.data;
  }

  export async function postCertificates(ctx: any) {
    const { passwordCertificate, serieInvoice, folioInvoice, userName, password } = ctx.request.body;
    const { certificate, privateKey } = ctx.request.files;

    const certificateBase64 = certificate[0].buffer.toString("base64");
    const privateKeyBase64 = privateKey[0].buffer.toString("base64");


    const user: User = await UserController.getUser(userName);
    const accessToken = await InvewinController.authCustom(
      password,
      userName,
      user.empresaId
    );

    await http.post(
      process.env.INVEWIN_API_URL +
      "/empresas/" +
      user.empresaId +
      "/certificadoscsd",
      {
        serieFacturacion: serieInvoice,
        folioFacturacion: folioInvoice,
        empresaId: user.empresaId,
        certificado: certificateBase64,
        llavePrivada: privateKeyBase64,
        password: passwordCertificate
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).catch((error) => {
      console.log("ERROR", error.response.data);
    }).then((response: any) => {
      console.log("RESPONSE", response);

      ctx.status = 200;

    });

  }

}

export default CerfificatesController;